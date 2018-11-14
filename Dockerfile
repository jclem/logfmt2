FROM node:alpine

WORKDIR build

ADD package*.json ./
RUN npm install

ADD . ./

RUN npm test
