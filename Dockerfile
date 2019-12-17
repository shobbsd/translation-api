FROM node:13.3-alpine

COPY package*.json .

RUN npm install --save-prod

COPY dist/ .

CMD [ "node", "./dist/main.js" ]
