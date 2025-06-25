@echo off
setlocal enabledelayedexpansion

:menu
cls
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
    echo.
    echo Running prerequisites check...
    if exist "scripts\01_check_prerequisites.bat" (
        call scripts\01_check_prerequisites.bat
    ) else (
        echo Batch file not found, trying bash version...
        bash scripts/01_check_prerequisites.sh
    )
    goto :continue
) else if "%choice%"=="2" (
    echo.
    echo Running environment setup...
    if exist "scripts\02_setup_environment.bat" (
        call scripts\02_setup_environment.bat
    ) else (
        echo Batch file not found, trying bash version...
        bash scripts/02_setup_environment.sh
    )
    goto :continue
) else if "%choice%"=="3" (
    echo.
    echo Running component extraction...
    if exist "scripts\03_extract_components.bat" (
        call scripts\03_extract_components.bat
    ) else (
        echo Batch file not found, trying bash version...
        bash scripts/03_extract_components.sh
    )
    goto :continue
) else if "%choice%"=="4" (
    echo.
    echo Running documentation build...
    if exist "scripts\04_build_docs.bat" (
        call scripts\04_build_docs.bat
    ) else (
        echo Batch file not found, trying bash version...
        bash scripts/04_build_docs.sh
    )
    goto :continue
) else if "%choice%"=="5" (
    echo.
    echo Starting documentation server...
    if exist "_build\html\index.html" (
        cd _build\html
        echo 🌐 Starting server at http://localhost:8000
        echo Press Ctrl+C to stop the server
        echo.
        start http://localhost:8000
        python -m http.server 8000
        cd ..\..
    ) else (
        echo ❌ No build found. Please build documentation first (option 4).
    )
    goto :continue
) else if "%choice%"=="6" (
    echo.
    echo Running complete setup...
    echo.
    echo Step 1/4: Checking prerequisites...
    call scripts\01_check_prerequisites.bat
    echo.
    echo Step 2/4: Setting up environment...
    call scripts\02_setup_environment.bat
    echo.
    echo Step 3/4: Extracting components...
    call scripts\03_extract_components.bat
    echo.
    echo Step 4/4: Building documentation...
    call scripts\04_build_docs.bat
    echo.
    echo 🎉 Complete setup finished!
    goto :continue
) else if "%choice%"=="7" (
    echo.
    echo Goodbye! 👋
    pause
    exit /b 0
) else (
    echo.
    echo ❌ Invalid choice. Please enter a number between 1-7.
    goto :continue
)

:continue
echo.
echo Press any key to return to menu...
pause >nul
goto :menu
