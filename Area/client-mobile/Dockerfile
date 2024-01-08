FROM node:latest

WORKDIR /app

COPY . /app
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ENV EAS_USERNAME=your_eas_username
ENV EAS_PASSWORD=your_eas_password
ENV EXPO_TOKEN=your_expo_token

RUN npm i
RUN npm install -g eas-cli
# RUN npm update -g eas-cli
RUN eas build -p android
CMD ["eas", "build:run", "-p", "android"]