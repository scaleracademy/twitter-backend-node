# Moo - A Twitter Clone
Backend API for Moo using Nest framework (NodeJS + TypeScript + PostgreSQL)

![NodeJS Workflow](https://github.com/scaleracademy/twitter-backend-node/actions/workflows/nodejs.yml/badge.svg)

## Prerequisites
```
1. Node
2. Docker
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# docker mode
$ docker-compose up &
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Setup Database 


```psql 
create database moodb;
create user mooadmin with password 'moopass';
grant all privileges on database moodb to mooadmin;
```


## License

This project is under the GNU AGPL v3.0 license 

