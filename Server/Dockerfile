FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN apt-get update && apt-get install -y build-essential


RUN rm -rf /app/node_modules

RUN npm install

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]