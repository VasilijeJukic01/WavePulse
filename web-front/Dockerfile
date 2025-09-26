# Stage 1: Fetching wait-for-it.sh
FROM alpine:latest as waitforit

WORKDIR /app

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /app/wait-for-it.sh

RUN chmod +x /app/wait-for-it.sh

# Stage 2: Build the application
FROM node:16 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 3: Final image
FROM node:16

WORKDIR /usr/src/app

COPY --from=waitforit /app/wait-for-it.sh /usr/src/app/wait-for-it.sh
COPY --from=build /usr/src/app /usr/src/app

EXPOSE 8083

CMD ["./wait-for-it.sh", "service-registry:8000", "--", "npm", "run", "serve"]