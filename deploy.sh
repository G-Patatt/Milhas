#!/bin/bash

echo "📥 Atualizando repositório..."
cd ~/Milhas || exit 1
git reset --hard HEAD
git pull origin main || exit 1

echo "🔁 Reiniciando backend com nohup..."
cd ~/Milhas/backend || exit 1
fuser -k 5001/tcp || true
nohup node server.js > backend.log 2>&1 &

echo "⚙️ Buildando frontend (usando build já existente)..."
cd ~/Milhas/milhas-frontend || exit 1

if [ ! -d "build" ]; then
  echo "❌ Pasta build não encontrada. Faça o build localmente e envie para o repositório."
else
  echo "✅ Build existente encontrado!"
fi

echo "🌐 Subindo frontend com serve..."
fuser -k 3000/tcp || true
nohup npx serve -s build -l 3000 > frontend.log 2>&1 &

echo "✅ Deploy completo!"
echo "🔗 Frontend: http://<SEU_IP>:3000"
echo "🛠️ Backend: http://<SEU_IP>:5001"
