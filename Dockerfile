FROM node:13.3-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY dist/ ./

EXPOSE 3000

ARG apikey
ENV apikey=$apikey

ARG PORT
ENV PORT=$PORT

ARG url
ENV url=$url

CMD [ "node", "./main.js" ]
