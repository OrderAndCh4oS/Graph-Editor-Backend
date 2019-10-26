FROM node:10

WORKDIR /usr/app

COPY ./app .

RUN npm install update
RUN npm install -g node-pre-gyp
RUN npm update node-pre-gyp
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g nodemon
RUN npm install

RUN chmod +x app/bin/*

CMD [ "ts-node",  "./src/server.ts"]
