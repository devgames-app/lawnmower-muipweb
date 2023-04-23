FROM node:alpine

COPY package.json .

RUN npm i

COPY . .

WORKDIR /app