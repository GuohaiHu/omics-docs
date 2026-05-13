const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 获取所有蛋白质
router.get('/proteins', async (req, res) => {
  try {
    const { limit = 100, offset = 0 } = req.query;

    const proteins = await db.all(
      'SELECT * FROM proteins ORDER BY protein_name LIMIT ? OFFSET ?',
      [parseInt(limit), parseInt(offset)]
    );

    const count = await db.get('SELECT COUNT(*) as total FROM proteins');

    res.json({
      data: proteins,
      pagination: {
        total: count.total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 获取单个蛋白质详情
router.get('/proteins/:id', async (req, res) => {
  try {
    const protein = await db.get(
      'SELECT * FROM proteins WHERE protein_id = ?',
      [req.params.id]
    );

    if (!protein) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Protein not found' }
      });
    }

    // 获取修饰信息
    const modifications = await db.all(
      'SELECT * FROM protein_modifications WHERE protein_id = ?',
      [req.params.id]
    );

    res.json({
      data: {
        ...protein,
        modifications
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 搜索蛋白质
router.get('/search/:keyword', async (req, res) => {
  try {
    const keyword = `%${req.params.keyword}%`;

    const proteins = await db.all(
      `SELECT * FROM proteins 
       WHERE protein_name LIKE ? 
          OR gene_name LIKE ? 
          OR uniprot_id LIKE ?
       LIMIT 50`,
      [keyword, keyword, keyword]
    );

    res.json({ data: proteins });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 获取蛋白质修饰
router.get('/modifications/:proteinId', async (req, res) => {
  try {
    const modifications = await db.all(
      'SELECT * FROM protein_modifications WHERE protein_id = ? ORDER BY site_position',
      [req.params.proteinId]
    );

    res.json({ data: modifications });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 获取蛋白质相互作用（简单版）
router.get('/interactions/:proteinId', async (req, res) => {
  try {
    // 这是一个占位符实现
    // 在实际应用中，需要一个专门的相互作用表
    res.json({
      data: {
        protein_id: req.params.proteinId,
        interactions: []
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

module.exports = router;
