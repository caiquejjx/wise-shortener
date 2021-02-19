FROM node:14.15.4-alpine3.12

RUN npm i -g @nestjs/cli@7.4.1

COPY . .

RUN yarn 

USER node


WORKDIR /home/node/app
