#!/bin/bash
echo "🔍 VERIFICANDO PUSH..."

cd ~/biye

echo "1. ✅ Estado git:"
git status

echo ""
echo "2. 🌐 Remotes:"
git remote -v

echo ""
echo "3. 📊 Último commit:"
git log --oneline -1

echo ""
echo "📋 VERIFICACIÓN EN GITHUB:"
echo "   - Ve a: https://github.com/MartinBernardoBonilla/Biye"
echo "   - Deberías ver:"
echo "     ✅ backend/ folder"
echo "     ✅ frontend/ folder" 
echo "     ✅ deploy/ folder"
echo "     ✅ README.md"
echo "     ✅ .gitignore"
echo "   - NO deberías ver:"
echo "     ❌ .env files"
echo "     ❌ node_modules/"
echo "     ❌ archivos temporales"
