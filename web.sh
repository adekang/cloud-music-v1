rm -rf build &&
yarn build &&
cd build &&
git init &&
git add . &&
git commit -m "deploy" &&
# git branch -M master &&
# git remote add origin git@github.com:adekang/cloud-music-web.git&&
# git push -f -u origin master &&

git branch -M gh-pages &&
git push -f git@github.com:adekang/cloud-music-v1.git gh-pages &&

cd -
