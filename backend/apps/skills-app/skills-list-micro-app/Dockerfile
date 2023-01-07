FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . /usr/src/app/

EXPOSE 8030
CMD [ "npm","start" ]