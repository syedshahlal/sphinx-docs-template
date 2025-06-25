@echo off
setlocal enabledelayedexpansion

echo.
echo ================================
echo 🚀 Starting Next.js Development Server
echo ================================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  npm not found. Please install npm first.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Set development environment
set NODE_ENV=development

echo.
echo 🌐 Starting Next.js on http://localhost:3000
echo 📱 Network access: http://0.0.0.0:3000
echo 🔄 Hot reload enabled
echo 🎯 Press Ctrl+C to stop
echo.

REM Start Next.js development server
npm run dev

echo.
echo ✅ Development server stopped
pause
