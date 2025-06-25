@echo off
setlocal enabledelayedexpansion

echo 🔍 Checking Prerequisites
echo ==========================

REM Check Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=2" %%i in ('python --version 2^>^&1') do set PYTHON_VERSION=%%i
    echo ✅ Python found: !PYTHON_VERSION!
) else (
    echo ❌ Python not found. Please install Python 3.8+
    pause
    exit /b 1
)

REM Check pip
pip --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ pip found
) else (
    echo ❌ pip not found. Please install pip
    pause
    exit /b 1
)

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js found: !NODE_VERSION!
) else (
    echo ⚠️  Node.js not found. Some features may be limited.
)

REM Check npm
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm found: !NPM_VERSION!
) else (
    echo ⚠️  npm not found. React integration may be limited.
)

echo.
echo 🎉 Prerequisites check completed!
echo.
pause
