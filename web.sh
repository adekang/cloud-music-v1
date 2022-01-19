rm -rf build &&
yarn build &&
cd build &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M master &&
git remote add origin git@github.com:adekang/cloud-music-web.git&&
git push -f -u origin master &&
cd -
