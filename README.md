# Moo - A Twitter Clone
Backend API for Moo using Nest framework (NodeJS + TypeScript + PostgreSQL)

![NodeJS Workflow](https://github.com/scaleracademy/twitter-backend-node/actions/workflows/nodejs.yml/badge.svg)


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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
