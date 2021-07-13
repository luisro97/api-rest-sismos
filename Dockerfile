FROM node:14

WORKDIR /app

COPY package*.json ./

COPY /sql/db.sql /docker-entrypoint-initdb.d/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]