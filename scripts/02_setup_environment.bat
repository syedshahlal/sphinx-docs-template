@echo off
setlocal enabledelayedexpansion

echo 🛠️  Setting Up Environment
echo ==========================

REM Create virtual environment
if not exist "venv" (
    echo 📦 Creating Python virtual environment...
    python -m venv venv
    if %errorlevel% neq 0 (
        echo ❌ Failed to create virtual environment
        pause
        exit /b 1
    )
) else (
    echo 📦 Virtual environment already exists
)

REM Activate virtual environment
call venv\Scripts\activate.bat
if %errorlevel% neq 0 (
    echo ❌ Failed to activate virtual environment
    pause
    exit /b 1
)
echo ✅ Virtual environment activated

REM Create requirements.txt if it doesn't exist
if not exist "requirements.txt" (
    echo 📝 Creating requirements.txt...
    (
        echo sphinx^>=7.0.0
        echo sphinx-rtd-theme^>=1.3.0
        echo sphinx-copybutton^>=0.5.0
        echo sphinx-design^>=0.5.0
        echo myst-parser^>=2.0.0
        echo beautifulsoup4^>=4.12.0
        echo lxml^>=4.9.0
        echo pyyaml^>=6.0
        echo jinja2^>=3.1.0
        echo watchdog^>=3.0.0
    ) > requirements.txt
)

REM Install Python dependencies
echo 📦 Installing Python dependencies...
python -m pip install --upgrade pip
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Failed to install Python dependencies
    pause
    exit /b 1
)

REM Install Node.js dependencies if package.json exists
if exist "package.json" (
    where npm >nul 2>&1
    if !errorlevel! equ 0 (
        echo 📦 Installing Node.js dependencies...
        npm install
    )
) else (
    where npm >nul 2>&1
    if !errorlevel! equ 0 (
        echo 📝 Creating package.json...
        (
            echo {
            echo   "name": "gra-core-docs",
            echo   "version": "1.0.0",
            echo   "description": "GRA Core Platform Documentation with React Integration",
            echo   "scripts": {
            echo     "dev": "next dev",
            echo     "build": "next build",
            echo     "start": "next start"
            echo   },
            echo   "dependencies": {
            echo     "next": "14.0.0",
            echo     "react": "18.2.0",
            echo     "react-dom": "18.2.0",
            echo     "lucide-react": "^0.294.0"
            echo   },
            echo   "devDependencies": {
            echo     "@types/node": "20.8.0",
            echo     "@types/react": "18.2.0",
            echo     "@types/react-dom": "18.2.0",
            echo     "typescript": "5.2.2"
            echo   }
            echo }
        ) > package.json
        npm install
    )
)

REM Create necessary directories
echo 📁 Creating project structure...
if not exist "_static" mkdir _static
if not exist "_static\css" mkdir _static\css
if not exist "_static\js" mkdir _static\js
if not exist "_templates" mkdir _templates
if not exist "_extensions" mkdir _extensions
if not exist "docs" mkdir docs
if not exist "components" mkdir components
if not exist "app" mkdir app

echo.
echo 🎉 Environment setup completed!
echo.
pause
