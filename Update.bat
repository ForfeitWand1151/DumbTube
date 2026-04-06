@echo off
title Upload para GitHub

if not exist ".git" (
    git init
)

REM verifica se ja existe remote
git remote get-url origin >nul 2>nul
if errorlevel 1 (
    set /p repo=Cole a URL do repositorio do GitHub: 
    git remote add origin %repo%
)

git add .
git reset upload_github.bat >nul 2>nul

set /p msg=Mensagem do commit: 
git commit -m "%msg%"

git branch -M main
git push -u origin main

echo Upload concluido!
pause