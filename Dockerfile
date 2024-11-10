FROM node:18

WORKDIR /app

COPY app/package* ./

RUN npm install

COPY app .

EXPOSE 80

CMD ["node", "server.js"]
