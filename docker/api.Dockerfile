FROM node:latest AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all

FROM node:latest AS runtime

WORKDIR /app

RUN useradd -m myuser
USER myuser

COPY --from=build /app .

ENV NODE_ENV=production

EXPOSE 8000

CMD [ "npm", "start" ]