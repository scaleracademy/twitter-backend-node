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

## Progress

- `auth`

  - [x] `POST /auth/login`

- `users`

  - [ ] `GET /users` 📃
  - [x] `GET /users/@{username}`
  - [x] `GET /users/{userid}`
  - [x] `POST /users`
  - [x] `PATCH /users/{userid}` 🔒
  - [x] `PUT /users/{userid}/follow` 🔒
  - [x] `DELETE /users/{userid}/follow` 🔒
  - [ ] `GET /users/{userid}/followers` 📃
  - [ ] `GET /users/{userid}/followees` 📃

- `posts`

  - [ ] `GET /posts` 📃
    - [x] filter by author
    - [ ] filter by replyTo
    - [ ] filter by origPosts
    - [ ] full-text-search on post content
  - [x] `GET /posts/{postid}`
  - [ ] `POST /posts` 🔒
    - [x] simple posts
    - [x] reply to a post
    - [x] repost / quote post
    - [ ] \#hashtags
    - [ ] \@mentions
  - [ ] `DELETE /posts/{postid}` 🔒
  - [ ] `PUT /posts/{postid}/like` 🔒
  - [ ] `DELETE /posts/{postid}/like` 🔒

- `hashtags`
  - [ ] `GET /hashtags` 📃
  - [ ] `GET /hashtags/{tag}/posts` 📃

## License

This project is under the GNU AGPL v3.0 license
