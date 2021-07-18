FROM node:13.12.0-alpine

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

# RUN npm install -g serve
