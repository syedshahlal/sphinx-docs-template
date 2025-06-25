@echo off
echo 🚀 Simple GRA Core Documentation Setup
echo ======================================
echo.

echo This will run all setup steps automatically.
echo Press any key to continue or Ctrl+C to cancel...
pause >nul

echo.
echo Step 1/4: Checking prerequisites...
echo -----------------------------------
call scripts\01_check_prerequisites.bat
if %errorlevel% neq 0 (
    echo ❌ Prerequisites check failed. Please fix the issues above.
    pause
    exit /b 1
)

echo.
echo Step 2/4: Setting up environment...
echo ----------------------------------
if exist "scripts\02_setup_environment.bat" (
    call scripts\02_setup_environment.bat
) else (
    echo Creating Python virtual environment...
    python -m venv venv
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
    echo Installing Python dependencies...
    pip install -r requirements.txt
    if exist "package.json" (
        echo Installing Node.js dependencies...
        npm install
    )
)

echo.
echo Step 3/4: Building documentation...
echo ----------------------------------
if exist "scripts\04_build_docs.bat" (
    call scripts\04_build_docs.bat
) else (
    echo Building Sphinx documentation...
    call venv\Scripts\activate.bat
    sphinx-build -b html . _build\html
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo Your documentation is ready at: _build\html\index.html
echo.
echo Press any key to open the documentation...
pause >nul
start _build\html\index.html
