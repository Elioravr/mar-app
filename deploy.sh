npm run build
sed -i 's/\/static/.\/static/g' build/index.html
sed -i 's/\/manifest/.\/manifest/g' build/index.html
sed -i 's/\/favicon.ico/.\/favicon.ico/g' build/index.html
firebase deploy
