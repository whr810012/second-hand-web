#!/bin/bash


npm run serve &

cd nodejs || { echo "无法进入 ./node 目录"; exit 1; }

node index &

wait