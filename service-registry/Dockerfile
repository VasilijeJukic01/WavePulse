FROM node:16

WORKDIR /usr/src/app

COPY service-registry/package*.json ./service-registry/

COPY common-utils/package*.json ./common-utils/

RUN cd common-utils && npm install

RUN cd service-registry && npm install

COPY common-utils ./common-utils
COPY service-registry ./service-registry

WORKDIR /usr/src/app/service-registry

EXPOSE 8000

CMD ["node", "app.js"]
