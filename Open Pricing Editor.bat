@echo off
title LeadsPitch Pricing Editor
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo   Node.js is not installed. Install it from https://nodejs.org then try again.
  echo.
  pause
  exit /b 1
)
node pricing-server.js --open
pause
