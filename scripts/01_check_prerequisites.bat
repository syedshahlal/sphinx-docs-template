@echo off
setlocal enabledelayedexpansion

echo 🔍 Checking Prerequisites
echo ==========================
echo.

REM Check Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=2" %%i in ('python --version 2^>^&1') do set PYTHON_VERSION=%%i
    echo ✅ Python found: !PYTHON_VERSION!
) else (
    echo ❌ Python not found. Please install Python 3.8+
    echo.
    echo Download from: https://www.python.org/downloads/
    goto :error
)

REM Check pip
pip --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ pip found
) else (
    echo ❌ pip not found. Please install pip
    goto :error
)

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js found: !NODE_VERSION!
) else (
    echo ⚠️  Node.js not found. Some features may be limited.
    echo    Download from: https://nodejs.org/
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
echo 🎉 Prerequisites check completed successfully!
echo.
echo Press any key to continue...
pause >nul
exit /b 0

:error
echo.
echo ❌ Prerequisites check failed!
echo Please install the missing requirements and try again.
echo.
pause
exit /b 1
