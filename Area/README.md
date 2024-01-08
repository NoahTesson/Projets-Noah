![project logo](./resource/NAPTE_banner.png)

# Project overview

The Area project consists in the creation of a software suite that functions similarly to IFTTT and Zapier.
This suite is divided into 3 parts:

+ A server / API to give the other apps all the features needed.

+ A web application to use the app from a browser.

+ A mobile application to use the app from a phone.

## Technologies

For the server:
+ Python / Django: A simple and easy to use framework, allowing us to easily implement other features if needed. [Learn more here](https://www.djangoproject.com/)

For the mobile application:
+ TypeScript / React native: One of the two main frameworks for mobile development, widely used and relatively easy to use. [Learn more here](https://reactnative.dev/)

For the web application:
+ TypeScript / Angular: A basic and easy to understand framework for web development. [Learn more here](https://angular.io/)

For the database:
+ MySql: A database well known for its security, performance and efficiency. [Learn more here](https://www.mysql.com/)

## Documentation

You can find all the documentation in the `documentation` folder.
The [en](./documentation/en/README.md) and [fr](./documentation/fr/README.md) folder are for differents languages.
Please refer to the `README.md` files in each folders for the transalted documentation informations.

## Services

For this project, we decided to use `NUMBER` services.
Here is a list of all the available services and the actions / reactions associated:
+ Discord:
    Actions:
    - When an user update his status
    - When an user is typing
    - When an user join the server
    - When an user is remove from the server
    - When an user is ban from the server
    - When an user is unban from the server
    - When a message is send on the server
    - When a channel is created
    - When a channel is updated
    - When a channel is deleted
    - When a message is pinned
    Reactions:
+ Twitter:
    Actions:
    Reactions:
    - Post a tweet
+ Google Sheet:
    Actions:
    Reactions:
    - Add to a spreadsheet

## How to launch the project

Build the project:
```shell
docker-compose build
```

In a terminal window, run:
```shell
docker-compose up --build
```
It should launch the different application and server.

If you have trouble with the db file not working, try this:
```shell
docker-compose down
docker-compose up --build
```
