FROM node:10

WORKDIR /usr/app

COPY ./app .

RUN npm install update
RUN npm install -g ts-node
RUN npm install -g nodemon
RUN npm install -g typescript
RUN npm install -g node-pre-gyp
RUN npm install

CMD [ "ts-node",  "./src/server.js"]
