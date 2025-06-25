@echo off
setlocal enabledelayedexpansion

echo 🚀 GRA Core Documentation Setup
echo ================================
echo.
echo Choose an option:
echo   1. Check Prerequisites
echo   2. Setup Environment  
echo   3. Extract Components
echo   4. Build Documentation
echo   5. Serve Documentation
echo   6. Complete Setup
echo   7. Exit
echo.

set /p choice="Enter your choice (1-7): "

if "%choice%"=="1" (
    echo Running prerequisites check...
    if exist "scripts\01_check_prerequisites.bat" (
        call scripts\01_check_prerequisites.bat
    ) else (
        bash scripts/01_check_prerequisites.sh
    )
) else if "%choice%"=="2" (
    echo Running environment setup...
    if exist "scripts\02_setup_environment.bat" (
        call scripts\02_setup_environment.bat
    ) else (
        bash scripts/02_setup_environment.sh
    )
) else if "%choice%"=="3" (
    echo Running component extraction...
    if exist "scripts\03_extract_components.bat" (
        call scripts\03_extract_components.bat
    ) else (
        bash scripts/03_extract_components.sh
    )
) else if "%choice%"=="4" (
    echo Running documentation build...
    if exist "scripts\04_build_docs.bat" (
        call scripts\04_build_docs.bat
    ) else (
        bash scripts/04_build_docs.sh
    )
) else if "%choice%"=="5" (
    echo Starting documentation server...
    if exist "_build\html\index.html" (
        cd _build\html
        echo 🌐 Starting server at http://localhost:8000
        echo Press Ctrl+C to stop
        python -m http.server 8000
    ) else (
        echo ❌ No build found. Please build documentation first.
        pause
    )
) else if "%choice%"=="6" (
    echo Running complete setup...
    call scripts\01_check_prerequisites.bat
    call scripts\02_setup_environment.bat
    call scripts\03_extract_components.bat
    call scripts\04_build_docs.bat
    echo.
    echo 🎉 Complete setup finished!
    pause
) else if "%choice%"=="7" (
    echo Goodbye! 👋
    exit /b 0
) else (
    echo ❌ Invalid choice. Please try again.
    pause
    goto :eof
)

echo.
echo Press any key to return to menu...
pause >nul
cls
goto :eof
