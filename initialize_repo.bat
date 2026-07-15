@echo off
echo Initializing Git repository...
git init

echo Configuring remote...
git remote add origin https://github.com/Bishawdev-Sen/Cosmic-Notes.git

echo Staging files...
git add .

echo Creating initial commit...
git commit -m "Initial commit of Cosmic Notes codebase"

echo Renaming branch to main...
git branch -M main

echo Pushing to GitHub (you may be prompted for authentication)...
git push -u origin main

echo Done!
pause
