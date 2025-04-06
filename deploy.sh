#!/bin/bash

echo "📥 Atualizando repositório..."
cd ~/Milhas || exit 1
git reset --hard HEAD
git pull origin main || exit 1

echo "📦 Instalando dependências do backend..."
cd ~/Milhas/backend || exit 1
npm install --omit=dev || echo "⚠️ Ignorando falhas no npm install"

echo "🔁 Reiniciando backend com nohup..."
fuser -k 5001/tcp || true
nohup node server.js > backend.log 2>&1 &

echo "📦 Instalando dependências do frontend..."
cd ~/Milhas/milhas-frontend || exit 1
npm install --omit=dev || echo "⚠️ Ignorando falhas no npm install"

echo "⚙️ Buildando frontend..."
npm run build

echo "🌐 Subindo frontend com serve..."
fuser -k 3000/tcp || true
nohup npx serve -s build -l 3000 > frontend.log 2>&1 &

echo "✅ Deploy completo!"
echo "🔗 Frontend: http://<seu-ip>:3000"
echo "🛠️ Backend: http://<seu-ip>:5001"
