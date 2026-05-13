#!/bin/bash

echo "🚀 多组学数据库 - 项目启动脚本"
echo "================================="

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装。请先安装 Node.js >= 20.0"
    exit 1
fi

echo -e "${GREEN}✓ Node.js 版本：$(node -v)${NC}"

# 检查主项目依赖
echo ""
echo -e "${BLUE}[1/4] 安装主项目依赖...${NC}"
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✓ 主项目依赖已安装"
fi

# 检查 API 服务器依赖
echo ""
echo -e "${BLUE}[2/4] 安装 API 服务器依赖...${NC}"
cd api-server
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✓ API 服务器依赖已安装"
fi

# 初始化数据库
echo ""
echo -e "${BLUE}[3/4] 初始化数据库...${NC}"
npm run db:init

cd ..

# 启动提示
echo ""
echo -e "${GREEN}✨ 启动完成！${NC}"
echo ""
echo -e "${YELLOW}下一步 - 启动开发服务器：${NC}"
echo ""
echo "1. 打开终端 1，启动 API 服务器："
echo "   cd api-server && npm run dev"
echo ""
echo "2. 打开终端 2，启动文档网站："
echo "   npm run start"
echo ""
echo -e "${YELLOW}访问地址：${NC}"
echo "• 文档网站：http://localhost:3000"
echo "• API 服务器：http://localhost:5000"
echo "• API 文档：http://localhost:5000/api-docs"
echo ""
