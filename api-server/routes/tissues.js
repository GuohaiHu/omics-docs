const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 获取所有组织
router.get('/', async (req, res) => {
  try {
    const { organism, limit = 20, offset = 0 } = req.query;
    
    let sql = 'SELECT * FROM tissues WHERE 1=1';
    const params = [];

    if (organism) {
      sql += ' AND organism = ?';
      params.push(organism);
    }

    sql += ' ORDER BY tissue_name';
    
    const countResult = await db.get(`SELECT COUNT(*) as total FROM (${sql})`, params);
    const rows = await db.all(
      sql + ` LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), parseInt(offset)]
    );

    res.json({
      data: rows,
      pagination: {
        total: countResult.total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 获取单个组织详情
router.get('/:id', async (req, res) => {
  try {
    const tissue = await db.get('SELECT * FROM tissues WHERE tissue_id = ?', [req.params.id]);
    
    if (!tissue) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Tissue not found' }
      });
    }

    res.json({ data: tissue });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 搜索组织
router.get('/search/:keyword', async (req, res) => {
  try {
    const keyword = `%${req.params.keyword}%`;
    
    const tissues = await db.all(
      `SELECT * FROM tissues 
       WHERE tissue_name LIKE ? 
          OR organism LIKE ?
       ORDER BY tissue_name
       LIMIT 50`,
      [keyword, keyword]
    );

    res.json({ data: tissues });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 查询组织推荐的酶
router.post('/compatibility', async (req, res) => {
  try {
    const { tissue_id, organism } = req.body;

    const tissue = await db.get(
      'SELECT * FROM tissues WHERE tissue_id = ? AND organism = ?',
      [tissue_id, organism]
    );

    if (!tissue) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Tissue not found' }
      });
    }

    const enzymes = JSON.parse(tissue.recommended_enzymes || '[]');

    res.json({
      data: {
        tissue: tissue.tissue_name,
        recommended_enzymes: enzymes,
        special_challenges: tissue.special_challenges,
        reference: tissue.reference
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 创建新组织记录
router.post('/', async (req, res) => {
  try {
    const {
      tissue_name, organism, ecm_components, fat_content,
      fibrosis_level, cell_density, special_challenges,
      recommended_enzymes, reference
    } = req.body;

    const stmt = `
      INSERT INTO tissues (
        tissue_name, organism, ecm_components, fat_content,
        fibrosis_level, cell_density, special_challenges,
        recommended_enzymes, reference
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await db.run(stmt, [
      tissue_name, organism, 
      JSON.stringify(ecm_components || []),
      fat_content, fibrosis_level, cell_density,
      JSON.stringify(special_challenges || []),
      JSON.stringify(recommended_enzymes || []),
      reference
    ]);

    res.status(201).json({
      data: {
        tissue_id: result.lastID,
        message: 'Tissue created successfully'
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

module.exports = router;
