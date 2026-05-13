# 🧬 多组学数据库 - 完整项目指南

一个综合的多组学数据平台，包含文档、数据浏览器、数据分析和 API 接口。

## 📋 项目结构

```
omics-docs/
├── docs/                      # Docusaurus 文档
│   ├── index.md              # 首页
│   ├── getting-started.md    # 快速开始
│   ├── 01_DNA-omics/         # DNA 组学内容
│   ├── 02_Cell-omics/        # 细胞组学内容
│   ├── 03_STOmics/           # 空间组学内容
│   ├── 04_Pro-omics/         # 蛋白质组学内容
│   ├── api/                  # API 文档
│   └── data-format/          # 数据格式规范
│
├── src/                       # React 源代码
│   ├── components/
│   │   ├── EnzymeExplorer/   # 酶学数据浏览器
│   │   ├── DataVisualization/ # 数据可视化仪表板
│   │   └── HomepageFeatures/ # 主页特性
│   └── pages/
│       ├── explorer.mdx      # 数据浏览器页面
│       ├── analysis.mdx      # 分析页面
│       └── markdown-page.mdx # 示例页面
│
├── api-server/               # Express.js 后端
│   ├── server.js             # 主服务器文件
│   ├── config/
│   │   └── database.js       # SQLite 配置
│   ├── routes/               # API 路由
│   │   ├── enzymes.js
│   │   ├── tissues.js
│   │   ├── scrnaseq.js
│   │   ├── spatial.js
│   │   ├── proteomics.js
│   │   └── analysis.js
│   ├── scripts/
│   │   └── init-db.js        # 数据库初始化
│   ├── package.json
│   └── README.md
│
├── package.json              # 主项目依赖
├── docusaurus.config.js      # Docusaurus 配置
├── sidebars.js              # 文档侧边栏
├── setup.sh                 # Linux/Mac 启动脚本
├── setup.bat                # Windows 启动脚本
└── README.md                # 本文件
```

## 🚀 快速开始

### 前置要求
- Node.js >= 20.0
- npm 或 yarn
- 2GB 可用磁盘空间

### 安装和启动

#### 方式 1：使用启动脚本（推荐）

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
```bash
setup.bat
```

#### 方式 2：手动启动

1. **安装主项目依赖**
   ```bash
   npm install
   ```

2. **安装 API 服务器依赖**
   ```bash
   cd api-server
   npm install
   npm run db:init
   cd ..
   ```

3. **启动 API 服务器**（终端 1）
   ```bash
   cd api-server
   npm run dev
   ```

4. **启动文档网站**（终端 2）
   ```bash
   npm run start
   ```

### 访问地址

| 服务 | 地址 | 描述 |
|------|------|------|
| 文档网站 | http://localhost:3000 | Docusaurus 文档 |
| API 服务器 | http://localhost:5000 | Express.js 后端 |
| API 文档 | http://localhost:5000/api-docs | 完整 API 列表 |
| 数据浏览器 | http://localhost:3000/explorer | 交互式数据查询 |
| 分析仪表板 | http://localhost:3000/analysis | 数据可视化 |

## 📚 核心功能

### 1. 知识库文档
- 4 大组学领域的详细教程
- 实验方案和最佳实践
- 数据分析指南
- 常见问题解答

### 2. 数据浏览器
- 酶学数据库查询
- 组织信息检索
- 支持多条件过滤
- 结果导出功能

### 3. 可视化仪表板
- 数据库统计信息
- 交互式图表
- 实时更新

### 4. RESTful API
- 完整的 REST 接口
- JSON 格式返回
- 支持跨域请求
- 详细的错误提示

## 🔧 技术栈

### 前端
- **Docusaurus 3.10** - 文档生成
- **React 19** - 用户界面
- **ECharts** - 数据可视化
- **MDX** - Markdown + React

### 后端
- **Express.js 4.18** - Web 框架
- **SQLite 3** - 数据库
- **CORS** - 跨域支持
- **Body Parser** - 请求解析

### 开发工具
- **Node.js 20+**
- **npm** - 包管理
- **Nodemon** - 热重载

## 📖 项目说明

### 文档部分

**组织结构:**
- 每个组学领域有 4 个核心文档：
  - Overview（概述）
  - Methods/Protocols（方法）
  - Analysis（分析）
  - Implementation（实施细节）

**文档特性:**
- 完整的表格和代码示例
- Mermaid 图表支持
- 交叉引用和导航
- 版本控制友好

### API 部分

**现有端点：**
- `/v1/enzymes` - 酶学数据
- `/v1/tissues` - 组织数据
- `/v1/scrnaseq` - 单细胞数据
- `/v1/spatial` - 空间组学数据
- `/v1/proteomics` - 蛋白质组学
- `/v1/analysis` - 分析工具

**数据库表：**
- `enzymes` - 商业酶制剂信息
- `tissues` - 组织特性
- `scrnaseq_datasets` - 单细胞数据集
- `scrnaseq_expression` - 基因表达
- `spatial_data` - 空间位置信息
- `proteins` - 蛋白质信息
- `protein_modifications` - 蛋白质修饰

### 前端组件

**EnzymeExplorer:**
- 酶类型过滤
- 组织搜索
- 分页显示
- 响应式设计

**DataVisualization:**
- 数据库统计
- 饼图/柱状图
- 卡片展示
- 实时数据同步

## 🛠️ 开发指南

### 添加新文档

1. 在对应的组学目录创建 `.md` 文件
2. 添加 YAML frontmatter（包含 sidebar_position）
3. 侧边栏会自动更新

### 添加新 API 端点

1. 在 `api-server/routes/` 中创建路由文件
2. 在 `server.js` 中挂载路由
3. 更新 API 文档

### 添加新数据库表

1. 修改 `api-server/config/database.js`
2. 在 `initializeDatabase()` 中添加 CREATE TABLE 语句
3. 运行 `npm run db:init` 重新初始化

### 修改样式

主要 CSS 文件：
- `src/css/custom.css` - 全局样式
- `src/components/*/styles.module.css` - 组件样式

## 📊 数据库管理

### 导入数据

```bash
cd api-server
node scripts/init-db.js
```

### 备份数据库

```bash
cp data/omics.db data/omics.db.backup
```

### SQLite 直接访问

```bash
sqlite3 data/omics.db
```

## 🔐 生产部署

### Docker 部署

```dockerfile
# Dockerfile 示例
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
WORKDIR /app/api-server
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
```

```bash
docker build -t omics-db .
docker run -p 3000:3000 -p 5000:5000 omics-db
```

### PM2 守护进程

```bash
npm install -g pm2
pm2 start api-server/server.js --name "omics-api"
pm2 start "npm run start" --name "omics-web"
pm2 save
pm2 startup
```

## 🐛 常见问题

**Q: 端口被占用？**
A: 修改 `.env` 或 `package.json` 中的端口配置。

**Q: 数据库初始化失败？**
A: 删除 `api-server/data/` 目录重新初始化。

**Q: 跨域错误？**
A: 检查 `api-server/.env` 中的 `CORS_ORIGIN` 设置。

**Q: 组件不显示？**
A: 确保 API 服务器正在运行，检查浏览器控制台错误。

## 📞 支持和贡献

- 🐛 发现 Bug：提交 Issue
- 💡 功能建议：讨论区留言
- 🤝 代码贡献：提交 Pull Request

## 📄 许可证

MIT License - 自由使用和修改

## 🎯 项目路线图

- [x] 框架搭建
- [x] 基础 API
- [x] 数据浏览器
- [x] 可视化仪表板
- [ ] 高级分析工具
- [ ] 用户认证系统
- [ ] 数据提交接口
- [ ] 移动应用

---

**最后更新：2024 年 5 月**

有任何问题或建议？欢迎提交反馈！
