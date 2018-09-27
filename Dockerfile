FROM node:alpine

WORKDIR build

ADD package*.json ./
RUN npm install

ADD . ./

RUN npm test
RUN npm run build

ARG NPM_TOKEN
RUN echo //registry.npmjs.org/:_authToken=$NPM_TOKEN > /root/.npmrc
