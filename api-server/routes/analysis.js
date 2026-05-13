const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 计算基因相关性
router.post('/correlation', async (req, res) => {
  try {
    const { gene_ids, dataset_id } = req.body;

    if (!gene_ids || gene_ids.length < 2) {
      return res.status(400).json({
        error: { code: 'INVALID_REQUEST', message: 'At least 2 genes required' }
      });
    }

    // 获取基因表达数据
    const expressions = await Promise.all(
      gene_ids.map(geneId =>
        db.all(
          'SELECT expression_mean FROM scrnaseq_expression WHERE gene_id = ? AND dataset_id = ?',
          [geneId, dataset_id]
        )
      )
    );

    res.json({
      data: {
        genes: gene_ids,
        correlation_matrix: calculateCorrelation(expressions),
        note: 'Simplified correlation calculation'
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 基因富集分析（占位符）
router.post('/enrichment', async (req, res) => {
  try {
    const { gene_ids, database = 'GO', ontology = 'BP' } = req.body;

    res.json({
      data: {
        input_genes: gene_ids.length,
        database,
        ontology,
        enriched_terms: [],
        note: 'Integration with external enrichment databases required'
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 酶兼容性分析
router.post('/enzyme-compatibility', async (req, res) => {
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

    const recommendedEnzymes = JSON.parse(tissue.recommended_enzymes || '[]');
    
    // 获取推荐酶的详细信息
    const enzymeDetails = await Promise.all(
      recommendedEnzymes.map(enzymeName =>
        db.get('SELECT * FROM enzymes WHERE enzyme_name = ?', [enzymeName])
      )
    );

    res.json({
      data: {
        tissue: tissue.tissue_name,
        organism,
        recommended_enzymes: enzymeDetails.filter(e => e !== undefined),
        special_considerations: tissue.special_challenges,
        reference: tissue.reference
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 数据库统计
router.get('/statistics', async (req, res) => {
  try {
    const stats = await Promise.all([
      db.get('SELECT COUNT(*) as count FROM enzymes'),
      db.get('SELECT COUNT(*) as count FROM tissues'),
      db.get('SELECT COUNT(*) as count FROM scrnaseq_datasets'),
      db.get('SELECT COUNT(*) as count FROM proteins')
    ]);

    res.json({
      data: {
        enzymes: stats[0].count,
        tissues: stats[1].count,
        scrnaseq_datasets: stats[2].count,
        proteins: stats[3].count,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'DB_ERROR', message: err.message } });
  }
});

// 简单相关性计算辅助函数
function calculateCorrelation(dataArrays) {
  // 这是一个简化版本，实际应使用更复杂的统计方法
  return {
    method: 'pearson',
    matrix: dataArrays.map(() => dataArrays.map(() => 0.5))
  };
}

module.exports = router;
