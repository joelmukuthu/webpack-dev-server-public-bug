FROM node:12-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY app.js index.html webpack.config.js ./
