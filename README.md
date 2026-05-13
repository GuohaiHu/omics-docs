# 🧬 多组学数据库

一个综合的多组学数据平台，集知识库、数据浏览、可视化分析和 API 接口于一体。

## ✨ 功能特性

- 📚 **完整知识库** - DNA/细胞/空间/蛋白质组学
- 🔍 **数据浏览器** - 酶学、组织、表达数据查询
- 📊 **可视化仪表板** - 实时数据统计和交互式图表
- 🔗 **RESTful API** - 完整的数据访问接口
- 🚀 **快速开始** - 一键部署开发环境

## 🚀 快速开始

### 前置要求
- Node.js >= 20.0
- npm 或 yarn

### 启动（推荐）

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
```bash
setup.bat
```

### 手动启动

1. 安装依赖
   ```bash
   npm install
   cd api-server && npm install && npm run db:init && cd ..
   ```

2. 启动 API 服务器
   ```bash
   cd api-server && npm run dev
   ```

3. 启动文档网站
   ```bash
   npm run start
   ```

访问：
- 📖 文档：http://localhost:3000
- 🔍 浏览器：http://localhost:3000/explorer
- 📊 分析：http://localhost:3000/analysis
- 🔗 API：http://localhost:5000

## 📋 项目结构

```
├── docs/                    # Docusaurus 文档
├── src/                     # React 组件和页面
├── api-server/              # Express.js 后端
│   ├── routes/              # API 路由
│   ├── config/              # 数据库配置
│   └── scripts/             # 初始化脚本
├── package.json             # 主项目依赖
└── FRAMEWORK_GUIDE.md       # 完整项目指南
```

## 📚 核心内容

### 四大组学领域

1. **🧬 DNA 组学** - 基因组、变异、拷贝数分析
2. **🔬 细胞组学** - 单细胞转录、蛋白、表型
3. **🌌 空间组学** - 保留空间信息的多组学
4. **🧪 蛋白质组学** - 质谱、流式、免疫检测

### 数据库资源

- **酶学知识库** - 100+ 种酶信息
- **组织数据库** - 20+ 种人源/模式生物组织
- **实验方案** - 详细的操作步骤
- **分析指南** - 数据处理工作流

## 🔧 技术栈

- **前端** - React 19, Docusaurus 3.10, ECharts
- **后端** - Express.js, SQLite
- **工具** - Node.js 20+, npm

## 📖 完整文档

查看 [FRAMEWORK_GUIDE.md](FRAMEWORK_GUIDE.md) 获取：
- 详细项目结构说明
- 开发指南
- 数据库管理
- 生产部署
- 常见问题

## 🔗 API 文档

启动后访问 http://localhost:5000/api-docs

### 主要端点
- `GET /v1/enzymes` - 酶列表
- `GET /v1/tissues` - 组织数据
- `GET /v1/scrnaseq/expression/:geneId` - 基因表达
- `POST /v1/analysis/enzyme-compatibility` - 酶兼容性分析

## 🛠️ 开发

### 添加新文档
在 `docs/` 相应目录创建 `.md` 文件

### 添加新 API
1. 在 `api-server/routes/` 创建路由
2. 在 `server.js` 中挂载

### 修改样式
编辑 `src/css/custom.css` 或组件 CSS 模块

## 📦 构建和部署

### 生产构建
```bash
npm run build
```

### Docker 部署
```bash
docker build -t omics-db .
docker run -p 3000:3000 -p 5000:5000 omics-db
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**开始使用：** [快速开始指南](./docs/getting-started.md)

**完整文档：** [框架指南](./FRAMEWORK_GUIDE.md)
