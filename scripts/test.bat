@echo off
echo 🧪 Testing batch file execution...
echo.

echo Testing prerequisites check...
call scripts\01_check_prerequisites.bat
if %errorlevel% equ 0 (
    echo ✅ Prerequisites check returned successfully
) else (
    echo ❌ Prerequisites check failed
)

echo.
echo Test completed. Press any key to exit...
pause >nul
