@echo off
cd /d %~dp0
cd frontend
if not exist node_modules npm install
npm run dev
cd ..