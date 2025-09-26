# Stage 1: Fetching wait-for-it.sh
FROM alpine:latest as waitforit

WORKDIR /app

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /app/wait-for-it.sh

RUN chmod +x /app/wait-for-it.sh

# Stage 2: Build the application
FROM node:16 as build

WORKDIR /usr/src/app

COPY api-gateway/package*.json ./api-gateway/
COPY common-utils/package*.json ./common-utils/

RUN cd common-utils && npm install
RUN cd api-gateway && npm install

COPY common-utils ./common-utils
COPY api-gateway ./api-gateway

# Stage 3: Final image
FROM node:16

WORKDIR /usr/src/app/api-gateway

COPY --from=waitforit /app/wait-for-it.sh /usr/src/app/api-gateway/wait-for-it.sh
COPY --from=build /usr/src/app/api-gateway /usr/src/app/api-gateway

EXPOSE 8080

CMD ["./wait-for-it.sh", "service-registry:8000", "--", "node", "app.js"]