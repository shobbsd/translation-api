FROM node:13.3-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY dist/ ./

RUN ls

ARG apikey
ENV apikey=$apikey

ARG url
ENV url=$url

CMD [ "node", "./main.js" ]
