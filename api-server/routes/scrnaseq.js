const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 获取所有单细胞数据集
router.get('/datasets', async (req, res) => {
  try {
    const datasets = await db.all(
      'SELECT * FROM scrnaseq_datasets ORDER BY created_at DESC'
    );
    res.json({ data: datasets });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 获取特定数据集详情
router.get('/datasets/:id', async (req, res) => {
  try {
    const dataset = await db.get(
      'SELECT * FROM scrnaseq_datasets WHERE dataset_id = ?',
      [req.params.id]
    );
    
    if (!dataset) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Dataset not found' }
      });
    }

    res.json({ data: dataset });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 查询基因表达数据
router.get('/expression/:geneId', async (req, res) => {
  try {
    const { datasetId } = req.query;
    
    const expression = await db.get(
      `SELECT * FROM scrnaseq_expression 
       WHERE gene_id = ? AND dataset_id = ?`,
      [req.params.geneId, datasetId]
    );

    if (!expression) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Gene expression data not found' }
      });
    }

    res.json({ data: expression });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 按细胞类型和基因查询
router.get('/genes', async (req, res) => {
  try {
    const { datasetId, cellType, limit = 50 } = req.query;
    
    let sql = 'SELECT DISTINCT gene_id, gene_name FROM scrnaseq_expression WHERE 1=1';
    const params = [];

    if (datasetId) {
      sql += ' AND dataset_id = ?';
      params.push(datasetId);
    }

    if (cellType) {
      sql += ' AND cell_type = ?';
      params.push(cellType);
    }

    sql += ` LIMIT ?`;
    params.push(parseInt(limit));

    const genes = await db.all(sql, params);
    res.json({ data: genes });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

module.exports = router;
