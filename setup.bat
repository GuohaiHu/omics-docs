@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 多组学数据库 - 项目启动脚本
echo =================================
echo.

REM 检查 Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装。请先安装 Node.js 20.0 或更高版本
    echo 访问：https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js 版本：%NODE_VERSION%
echo.

REM 安装主项目依赖
echo [1/4] 安装主项目依赖...
if not exist "node_modules" (
    call npm install
) else (
    echo ✓ 主项目依赖已安装
)
echo.

REM 安装 API 服务器依赖
echo [2/4] 安装 API 服务器依赖...
cd api-server
if not exist "node_modules" (
    call npm install
) else (
    echo ✓ API 服务器依赖已安装
)
cd ..
echo.

REM 初始化数据库
echo [3/4] 初始化数据库...
cd api-server
call npm run db:init
cd ..
echo.

REM 启动提示
echo ✨ 启动完成！
echo.
echo 下一步 - 启动开发服务器：
echo.
echo 1. 打开命令提示符，启动 API 服务器：
echo    cd api-server
echo    npm run dev
echo.
echo 2. 打开另一个命令提示符，启动文档网站：
echo    npm run start
echo.
echo 访问地址：
echo • 文档网站：http://localhost:3000
echo • API 服务器：http://localhost:5000
echo • API 文档：http://localhost:5000/api-docs
echo.
pause
