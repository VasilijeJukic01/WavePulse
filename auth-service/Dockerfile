# Stage 1: Fetching wait-for-it.sh
FROM alpine:latest as waitforit

WORKDIR /app

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /app/wait-for-it.sh

RUN chmod +x /app/wait-for-it.sh

# Stage 2: Build the application
FROM node:16 as build

WORKDIR /usr/src/app

COPY auth-service/package*.json ./auth-service/
COPY common-utils/package*.json ./common-utils/

RUN cd common-utils && npm install
RUN cd auth-service && npm install

COPY common-utils ./common-utils
COPY auth-service ./auth-service

# Stage 3: Final image
FROM node:16

WORKDIR /usr/src/app/auth-service

COPY --from=waitforit /app/wait-for-it.sh /usr/src/app/auth-service/wait-for-it.sh
COPY --from=build /usr/src/app/auth-service /usr/src/app/auth-service

EXPOSE 8081 8091 8101

CMD ["./wait-for-it.sh", "service-registry:8000", "--", "sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && node server.js"]