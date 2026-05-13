const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 获取所有酶 - 支持过滤和分页
router.get('/', async (req, res) => {
  try {
    const { type, tissue, limit = 20, offset = 0 } = req.query;
    
    let sql = 'SELECT * FROM enzymes WHERE 1=1';
    const params = [];

    if (type) {
      sql += ' AND type = ?';
      params.push(type);
    }

    if (tissue) {
      sql += ' AND tissue_applicability LIKE ?';
      params.push(`%${tissue}%`);
    }

    sql += ' ORDER BY enzyme_name';
    
    // 获取总数
    const countResult = await db.get(`SELECT COUNT(*) as total FROM (${sql})`, params);
    
    // 获取分页数据
    const rows = await db.all(
      sql + ` LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), parseInt(offset)]
    );

    res.json({
      data: rows,
      pagination: {
        total: countResult.total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        page: Math.floor(parseInt(offset) / parseInt(limit)) + 1
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 获取单个酶详情
router.get('/:id', async (req, res) => {
  try {
    const enzyme = await db.get('SELECT * FROM enzymes WHERE enzyme_id = ?', [req.params.id]);
    
    if (!enzyme) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Enzyme not found' }
      });
    }

    res.json({ data: enzyme });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 搜索酶
router.get('/search/:keyword', async (req, res) => {
  try {
    const keyword = `%${req.params.keyword}%`;
    
    const enzymes = await db.all(
      `SELECT * FROM enzymes 
       WHERE enzyme_name LIKE ? 
          OR catalog_number LIKE ? 
          OR vendor LIKE ?
       ORDER BY enzyme_name
       LIMIT 50`,
      [keyword, keyword, keyword]
    );

    res.json({ data: enzymes, count: enzymes.length });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 获取所有酶类型
router.get('/types/all', async (req, res) => {
  try {
    const types = await db.all(
      'SELECT DISTINCT type FROM enzymes ORDER BY type'
    );

    res.json({ data: types.map(t => t.type) });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 创建新酶记录（管理员）
router.post('/', async (req, res) => {
  try {
    const {
      enzyme_name, type, catalog_number, vendor, substrate,
      optimal_ph, temperature, cofactors, tissue_applicability,
      working_concentration, inhibitors, reference
    } = req.body;

    const stmt = `
      INSERT INTO enzymes (
        enzyme_name, type, catalog_number, vendor, substrate,
        optimal_ph, temperature, cofactors, tissue_applicability,
        working_concentration, inhibitors, reference
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await db.run(stmt, [
      enzyme_name, type, catalog_number, vendor, substrate,
      optimal_ph, temperature, 
      JSON.stringify(cofactors || []), 
      JSON.stringify(tissue_applicability || []),
      working_concentration, 
      JSON.stringify(inhibitors || []), 
      reference
    ]);

    res.status(201).json({
      data: {
        enzyme_id: result.lastID,
        message: 'Enzyme created successfully'
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 更新酶记录
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // 构建动态 UPDATE 语句
    const allowedFields = [
      'enzyme_name', 'type', 'catalog_number', 'vendor', 'substrate',
      'optimal_ph', 'temperature', 'cofactors', 'tissue_applicability',
      'working_concentration', 'inhibitors', 'reference'
    ];

    const updateFields = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .map(key => `${key} = ?`);

    if (updateFields.length === 0) {
      return res.status(400).json({
        error: { code: 'INVALID_REQUEST', message: 'No valid fields to update' }
      });
    }

    const values = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .map(key => updates[key]);

    const sql = `
      UPDATE enzymes SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE enzyme_id = ?
    `;

    await db.run(sql, [...values, id]);

    res.json({ message: 'Enzyme updated successfully' });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 删除酶记录
router.delete('/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM enzymes WHERE enzyme_id = ?', [req.params.id]);
    res.json({ message: 'Enzyme deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 统计
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await db.get(`
      SELECT
        COUNT(*) as total_enzymes,
        COUNT(DISTINCT type) as total_types,
        COUNT(DISTINCT vendor) as total_vendors
      FROM enzymes
    `);

    res.json({ data: stats });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

module.exports = router;
