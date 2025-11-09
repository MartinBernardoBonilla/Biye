#!/bin/bash
echo "🧹 LIMPIANDO ARCHIVOS NO DESEADOS DE GIT"
echo "========================================"

cd ~/biye

echo "1. 🔍 Buscando archivos potencialmente no deseados..."
find . -name "*.example" -o -name "*.sample" -o -name "*.template" | while read file; do
    echo "📄 $file"
done

echo ""
echo "2. 📋 Archivos específicos a revisar:"
if [ -f "backend/.env.example" ]; then
    echo "❓ backend/.env.example - ¿Contiene datos sensibles?"
    echo "   Contenido:"
    head -5 backend/.env.example
fi

echo ""
echo "3. 🗑️  Eliminando backend/.env.example de git..."
git rm --cached backend/.env.example 2>/dev/null && echo "✅ backend/.env.example eliminado" || echo "⚠️  No se pudo eliminar"

echo ""
echo "4. 📊 Estado actual:"
git status --short
