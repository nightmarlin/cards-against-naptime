FROM node:10

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY . .

RUN yarn install --production

CMD [ "node", "index.js" ]
EXPOSE 3000
