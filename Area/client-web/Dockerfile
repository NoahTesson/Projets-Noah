FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . /app

EXPOSE 8081

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "8081"]