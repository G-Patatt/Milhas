#!/bin/bash

echo "🔄 Atualizando código do Git..."
cd ~/Milhas
git pull origin main

echo "📦 Instalando dependências do backend..."
cd ~/Milhas/backend
npm install

echo "🔁 Reiniciando backend com PM2..."
pm2 restart backend || pm2 start server.js --name backend

echo "📦 Instalando dependências do frontend..."
cd ~/Milhas/milhas-frontend
npm install

echo "⚙️ Gerando build do frontend..."
npm run build

echo "✅ Deploy finalizado com sucesso!"
