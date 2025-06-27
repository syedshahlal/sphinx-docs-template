@echo off
setlocal enabledelayedexpansion

echo 📚 Building Documentation
echo =========================

REM Activate virtual environment
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
    echo 📦 Virtual environment activated
) else (
    echo ❌ Virtual environment not found. Run 02_setup_environment.bat first
    pause
    exit /b 1
)

REM Clean previous build
if exist "_build" (
    echo 🧹 Cleaning previous build...
    rmdir /s /q _build
)

REM Check if conf.py exists
if not exist "conf.py" (
    echo ⚠️  conf.py not found. Creating basic configuration...
    (
        echo import os
        echo import sys
        echo sys.path.insert^(0, os.path.abspath^('_extensions'^)^)
        echo.
        echo project = 'GRA Core Platform'
        echo copyright = '2024, Bank of America'
        echo author = 'Bank of America Technology Team'
        echo.
        echo extensions = [
        echo     'sphinx.ext.autodoc',
        echo     'sphinx.ext.viewcode',
        echo     'sphinx_copybutton',
        echo     'sphinx_design',
        echo     'myst_parser',
        echo     'react_sphinx_integration',
        echo ]
        echo.
        echo templates_path = ['_templates']
        echo html_static_path = ['_static']
        echo html_theme = 'sphinx_rtd_theme'
        echo.
        echo html_css_files = [
        echo     'css/react-integration.css',
        echo ]
        echo.
        echo html_js_files = [
        echo     'js/react-integration.js',
        echo ]
    ) > conf.py
)

REM Check if index.rst exists
if not exist "index.rst" (
    echo ⚠️  index.rst not found. Creating basic index...
    (
        echo GRA Core Platform Documentation
        echo ===============================
        echo.
        echo Welcome to the GRA Core Platform Documentation with React Integration.
        echo.
        echo .. toctree::
        echo    :maxdepth: 2
        echo    :caption: Contents:
        echo.
        echo    getting-started/index
        echo.
        echo Indices and tables
        echo ==================
        echo.
        echo * :ref:`genindex`
        echo * :ref:`modindex`
        echo * :ref:`search`
    ) > index.rst
)

REM Build documentation
echo 🔨 Building Sphinx documentation...
sphinx-build -b html . _build\html
if %errorlevel% neq 0 (
    echo ❌ Build failed. Check the output above.
    pause
    exit /b 1
)

REM Verify build
if exist "_build\html\index.html" (
    echo ✅ Documentation built successfully!
    echo 📁 Output: _build\html\
) else (
    echo ❌ Build failed. Check the output above.
    pause
    exit /b 1
)

echo.
echo 🎉 Build completed!
echo.
pause
