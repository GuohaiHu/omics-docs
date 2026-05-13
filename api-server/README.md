# 多组学数据库 API 服务器

这是多组学数据库项目的后端 API 服务，基于 Express.js 和 SQLite。

## 🚀 快速开始

### 前置要求
- Node.js >= 20.0
- npm 或 yarn

### 安装

```bash
cd api-server
npm install
```

### 初始化数据库

```bash
npm run db:init
```

这会创建数据库表并插入示例数据。

### 开发模式

```bash
npm run dev
```

服务器会在 `http://localhost:5000` 启动，支持热重载。

### 生产模式

```bash
npm start
```

## 📁 项目结构

```
api-server/
├── server.js              # 主应用文件
├── config/
│   └── database.js        # SQLite 数据库配置
├── routes/
│   ├── enzymes.js         # 酶学端点
│   ├── tissues.js         # 组织数据端点
│   ├── scrnaseq.js        # 单细胞数据端点
│   ├── spatial.js         # 空间组学端点
│   ├── proteomics.js      # 蛋白质组学端点
│   └── analysis.js        # 分析端点
├── scripts/
│   └── init-db.js         # 数据库初始化脚本
├── package.json
└── .env                   # 环境配置
```

## 🔌 API 端点

### 酶学数据
```
GET  /v1/enzymes                    # 获取酶列表
GET  /v1/enzymes/:id                # 获取酶详情
GET  /v1/enzymes/search/:keyword    # 搜索酶
GET  /v1/enzymes/types/all          # 获取所有酶类型
POST /v1/enzymes                    # 创建新酶
PUT  /v1/enzymes/:id                # 更新酶
DELETE /v1/enzymes/:id              # 删除酶
GET  /v1/enzymes/stats/summary      # 酶统计
```

### 组织数据
```
GET  /v1/tissues                    # 获取组织列表
GET  /v1/tissues/:id                # 获取组织详情
GET  /v1/tissues/search/:keyword    # 搜索组织
POST /v1/tissues/compatibility      # 查询推荐酶
POST /v1/tissues                    # 创建新组织
```

### 单细胞数据
```
GET  /v1/scrnaseq/datasets          # 获取数据集列表
GET  /v1/scrnaseq/datasets/:id      # 获取数据集详情
GET  /v1/scrnaseq/expression/:geneId # 查询基因表达
GET  /v1/scrnaseq/genes             # 获取基因列表
```

### 空间组学
```
GET  /v1/spatial/positions          # 获取空间位置
GET  /v1/spatial/neighbors/:cellId  # 获取细胞邻域
GET  /v1/spatial/heatmap/:geneId    # 获取基因热力图
```

### 蛋白质组学
```
GET  /v1/proteomics/proteins        # 获取蛋白质列表
GET  /v1/proteomics/proteins/:id    # 获取蛋白质详情
GET  /v1/proteomics/search/:keyword # 搜索蛋白质
GET  /v1/proteomics/modifications/:id # 获取修饰信息
GET  /v1/proteomics/interactions/:id  # 获取相互作用
```

### 分析
```
POST /v1/analysis/correlation       # 计算相关性
POST /v1/analysis/enrichment        # 富集分析
POST /v1/analysis/enzyme-compatibility # 酶兼容性分析
GET  /v1/analysis/statistics        # 数据库统计
```

## 📝 使用示例

### 查询酶
```bash
curl http://localhost:5000/v1/enzymes?type=collagenase&limit=10
```

### 搜索组织
```bash
curl http://localhost:5000/v1/tissues/search/liver
```

### 查询基因表达
```bash
curl "http://localhost:5000/v1/scrnaseq/expression/ENSG00000000003?datasetId=1"
```

### 酶兼容性查询
```bash
curl -X POST http://localhost:5000/v1/analysis/enzyme-compatibility \
  -H "Content-Type: application/json" \
  -d '{"tissue_id": 1, "organism": "human"}'
```

## 🔐 环境变量

修改 `.env` 文件配置：

```env
NODE_ENV=development        # 运行环境
PORT=5000                  # 服务器端口
DB_PATH=./data/omics.db    # 数据库路径
API_VERSION=v1             # API 版本
CORS_ORIGIN=*              # CORS 来源
LOG_LEVEL=debug            # 日志级别
```

## 📊 数据库结构

### 主要表

#### enzymes（酶表）
```sql
- enzyme_id (主键)
- enzyme_name
- type
- catalog_number
- vendor
- substrate
- optimal_ph
- temperature
- cofactors
- tissue_applicability
- working_concentration
- inhibitors
- reference
```

#### tissues（组织表）
```sql
- tissue_id (主键)
- tissue_name
- organism
- ecm_components
- fat_content
- fibrosis_level
- cell_density
- special_challenges
- recommended_enzymes
- reference
```

#### 其他表
- `scrnaseq_datasets` - 单细胞数据集
- `scrnaseq_expression` - 单细胞表达数据
- `spatial_data` - 空间组学数据
- `proteins` - 蛋白质信息
- `protein_modifications` - 蛋白质修饰

## 🧪 测试

运行测试套件：

```bash
npm test
```

## 📦 部署

### Docker 部署

```bash
docker build -t omics-api .
docker run -p 5000:5000 -e NODE_ENV=production omics-api
```

### PM2 部署

```bash
npm install -g pm2
pm2 start server.js --name "omics-api"
```

## 🔄 数据导入

从 CSV 文件导入数据：

```bash
node scripts/import-data.js --file data.csv --table enzymes
```

## 📚 API 文档完整版

访问 http://localhost:5000/api-docs 获取完整 API 文档。

## 🛠️ 开发指南

### 添加新端点

1. 在 `routes/` 目录创建新文件
2. 编写路由处理器
3. 在 `server.js` 中挂载路由
4. 更新 API 文档

### 添加新数据库表

1. 修改 `config/database.js` 中的 `initializeDatabase()` 函数
2. 运行 `npm run db:init` 重新初始化（注意：会覆盖现有数据）

## 🚨 常见问题

**Q: 数据库错误？**
A: 检查 `data/` 目录是否存在，运行 `npm run db:init` 重新初始化。

**Q: 跨域错误？**
A: 修改 `.env` 中的 `CORS_ORIGIN`，或在客户端添加正确的 Origin 头。

**Q: 端口被占用？**
A: 修改 `.env` 中的 `PORT`，或杀死占用该端口的进程。

## 📖 相关文档

- [主项目 README](../README.md)
- [API 文档](../docs/api/overview.md)
- [数据格式](../docs/data-format/overview.md)

## 🤝 贡献

欢迎提交 PR 和 Issue！

## 📄 许可证

MIT License
