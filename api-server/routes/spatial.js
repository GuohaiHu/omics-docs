const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 获取空间位置数据
router.get('/positions', async (req, res) => {
  try {
    const { datasetId, limit = 1000, offset = 0 } = req.query;

    let sql = 'SELECT * FROM spatial_data WHERE 1=1';
    const params = [];

    if (datasetId) {
      sql += ' AND dataset_id = ?';
      params.push(datasetId);
    }

    const positions = await db.all(
      sql + ` LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), parseInt(offset)]
    );

    res.json({
      data: positions,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 获取特定细胞的邻域信息
router.get('/neighbors/:cellId', async (req, res) => {
  try {
    const { datasetId, radius = 50 } = req.query;

    const cell = await db.get(
      'SELECT x, y, z FROM spatial_data WHERE cell_id = ? AND dataset_id = ?',
      [req.params.cellId, datasetId]
    );

    if (!cell) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Cell not found' }
      });
    }

    // 简单的距离计算（可优化为空间索引）
    const neighbors = await db.all(
      `SELECT * FROM spatial_data 
       WHERE dataset_id = ? 
         AND cell_id != ?
         AND SQRT(POW(x - ?, 2) + POW(y - ?, 2)) <= ?
       ORDER BY SQRT(POW(x - ?, 2) + POW(y - ?, 2))`,
      [datasetId, req.params.cellId, cell.x, cell.y, radius, cell.x, cell.y]
    );

    res.json({
      data: {
        cell: req.params.cellId,
        neighbors: neighbors,
        radius: radius
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 获取基因热力图数据
router.get('/heatmap/:geneId', async (req, res) => {
  try {
    const { datasetId } = req.query;

    const data = await db.all(
      `SELECT cell_id, x, y, z, intensity
       FROM spatial_data 
       WHERE dataset_id = ? AND gene_expression LIKE ?
       ORDER BY intensity DESC`,
      [datasetId, `%${req.params.geneId}%`]
    );

    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

module.exports = router;
