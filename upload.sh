#!/usr/bin/env bash
# 上传本地项目到远端服务器
tar cvzf project.tgz --exclude=node_modules ./
echo 打包成功
# tar -zxvf ./project.tar.gz
echo 解压
scp ./project.tgz root@139.155.232.209:/www/node

echo 上传成功