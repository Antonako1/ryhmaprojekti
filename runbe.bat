@echo off
cd /D %~dp0
cd backend
if not exist node_modules npm i
if "%1" == "QQ" del /q/s/f database.sqlite
npm run dev
cd ..