require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8000;
const API_VERSION = process.env.API_VERSION || 'v1';

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 初始化数据库
const db = require('./config/database');

// API 路由
const enzymeRoutes = require('./routes/enzymes');
const tissueRoutes = require('./routes/tissues');
const scRNAseqRoutes = require('./routes/scrnaseq');
const spatialRoutes = require('./routes/spatial');
const proteomicsRoutes = require('./routes/proteomics');
const analysisRoutes = require('./routes/analysis');

// 挂载路由
app.use(`/${API_VERSION}/enzymes`, enzymeRoutes);
app.use(`/${API_VERSION}/tissues`, tissueRoutes);
app.use(`/${API_VERSION}/scrnaseq`, scRNAseqRoutes);
app.use(`/${API_VERSION}/spatial`, spatialRoutes);
app.use(`/${API_VERSION}/proteomics`, proteomicsRoutes);
app.use(`/${API_VERSION}/analysis`, analysisRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: API_VERSION
  });
});

// API 文档
app.get('/api-docs', (req, res) => {
  res.json({
    name: 'Multi-omics Database API',
    version: '1.0.0',
    description: 'RESTful API for accessing multi-omics data',
    baseUrl: `http://localhost:${PORT}/${API_VERSION}`,
    endpoints: {
      enzymes: `/${API_VERSION}/enzymes`,
      tissues: `/${API_VERSION}/tissues`,
      scrnaseq: `/${API_VERSION}/scrnaseq`,
      spatial: `/${API_VERSION}/spatial`,
      proteomics: `/${API_VERSION}/proteomics`,
      analysis: `/${API_VERSION}/analysis`
    }
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Endpoint ${req.method} ${req.path} not found`
    }
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`\n🚀 Multi-omics API Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`💓 Health check: http://localhost:${PORT}/health\n`);
});

module.exports = app;
