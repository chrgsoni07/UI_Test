#!/bin/bash
cd /var/www/html/SmartResumeFrontEnd  && npm install && pm2 delete smartresume-frontend-app || true && pm2 start npm --name "smartresume-frontend-app" -- run dev  && pm2 save
