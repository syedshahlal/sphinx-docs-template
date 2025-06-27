@echo off
setlocal enabledelayedexpansion

echo 🛠️  Setting Up Environment
echo ==========================

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

echo ✅ Python is available

REM Create virtual environment
if not exist "venv" (
    echo 📦 Creating Python virtual environment...
    python -m venv venv --upgrade-deps
    if %errorlevel% neq 0 (
        echo ❌ Failed to create virtual environment
        echo Trying alternative method...
        python -m venv venv
        if %errorlevel% neq 0 (
            echo ❌ Still failed to create virtual environment
            pause
            exit /b 1
        )
    )
    echo ✅ Virtual environment created
) else (
    echo 📦 Virtual environment already exists
)

REM Activate virtual environment
echo 📦 Activating virtual environment...
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
) else if exist "venv\bin\activate" (
    call venv\bin\activate
) else (
    echo ❌ Virtual environment activation script not found
    pause
    exit /b 1
)

REM Verify activation worked
python -c "import sys; print('Virtual env active:', hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix))"

REM Ensure pip is available and upgrade it
echo 📦 Ensuring pip is available...
python -m ensurepip --upgrade >nul 2>&1
python -m pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ pip is not available, trying to install...
    python -m ensurepip --default-pip
    if %errorlevel% neq 0 (
        echo ❌ Failed to install pip
        pause
        exit /b 1
    )
)

echo ✅ pip is available
python -m pip --version

REM Upgrade pip
echo 📦 Upgrading pip...
python -m pip install --upgrade pip
if %errorlevel% neq 0 (
    echo ⚠️  Warning: Failed to upgrade pip, continuing anyway...
)

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
    echo ✅ requirements.txt created
)

REM Install Python dependencies
echo 📦 Installing Python dependencies...
echo This may take a few minutes...
python -m pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Failed to install Python dependencies
    echo Trying to install packages individually...
    
    python -m pip install sphinx
    python -m pip install sphinx-rtd-theme
    python -m pip install sphinx-copybutton
    python -m pip install sphinx-design
    python -m pip install myst-parser
    python -m pip install beautifulsoup4
    python -m pip install lxml
    python -m pip install pyyaml
    python -m pip install jinja2
    python -m pip install watchdog
    
    if %errorlevel% neq 0 (
        echo ❌ Failed to install some packages
        pause
        exit /b 1
    )
)

echo ✅ Python dependencies installed

REM Check if Node.js is available
where npm >nul 2>&1
if %errorlevel% equ 0 (
    REM Install Node.js dependencies if package.json exists
    if exist "package.json" (
        echo 📦 Installing Node.js dependencies...
        npm install
        if %errorlevel% neq 0 (
            echo ⚠️  Warning: Failed to install Node.js dependencies
        ) else (
            echo ✅ Node.js dependencies installed
        )
    ) else (
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
        echo ✅ package.json created
        
        echo 📦 Installing Node.js dependencies...
        npm install
        if %errorlevel% neq 0 (
            echo ⚠️  Warning: Failed to install Node.js dependencies
        ) else (
            echo ✅ Node.js dependencies installed
        )
    )
) else (
    echo ⚠️  Node.js/npm not found, skipping Node.js dependencies
    echo You can install Node.js from https://nodejs.org if needed
)

REM Create necessary directories
echo 📁 Creating project structure...
if not exist "_static" mkdir _static
if not exist "_static\css" mkdir _static\css
if not exist "_static\js" mkdir _static\js
if not exist "_templates" mkdir _templates
if not exist "_extensions" mkdir _extensions
if not exist "src" mkdir src
if not exist "src\gcp_docs" mkdir src\gcp_docs
if not exist "src\gcp_docs\docs" mkdir src\gcp_docs\docs
if not exist "src\gcp_docs\docs\gcp_5.6" mkdir src\gcp_docs\docs\gcp_5.6
if not exist "components" mkdir components
if not exist "app" mkdir app

echo ✅ Project structure created

REM Test the installation
echo 🧪 Testing installation...
python -c "import sphinx; print('Sphinx version:', sphinx.__version__)"
if %errorlevel% neq 0 (
    echo ❌ Sphinx installation test failed
    pause
    exit /b 1
)

echo.
echo 🎉 Environment setup completed successfully!
echo.
echo Next steps:
echo 1. Run scripts\04_build_docs.bat to build documentation
echo 2. Run scripts\05_serve_docs.bat to serve documentation
echo.
pause
