#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下 
if [  -d "/tmp/dist" ];then
  rm -rf /tmp/dist
fi


cp -r dist /tmp/
cd /tmp/dist

# 404 跳转
echo "<script>fetch('index.html').then(r=>r.text()).then(d=>document.write(d))</script>" > 404.html

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.gitee.io
git push -f https://gitee.com/segment-oj/segment-oj.git master


cd -
