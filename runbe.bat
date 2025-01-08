@echo off
cd /D %~dp0
cd backend
if "%1" == "QQ" (
    del /q/s/f database.sqlite
)
npm run dev
cd ..