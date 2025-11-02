@echo off
cd /d %~dp0

:: اگر Git Bash نصب شده در مسیر پیش‌فرض
"C:\Program Files\Git\bin\bash.exe" deploy.sh %*

pause