# Moo - A Twitter Clone

Backend API for Moo using Nest framework (NodeJS + TypeScript + PostgreSQL)

![NodeJS Workflow](https://github.com/scaleracademy/twitter-backend-node/actions/workflows/nodejs.yml/badge.svg)

## About

### Idea

Moo is a parody of Twitter. Further information about features and DB schema requirements can be found on this discussion board :
https://github.com/scaleracademy/open-source-projects/discussions/81

### UI Design

The UI is being designed on Figma if you'd like to view

- [Figma UI Prototype](https://www.figma.com/file/i7IjqvJVL6c5h2Tdzuul3c/Moo-Twitter-Design-File)
- [Figma Discussion Jam Board](https://www.figma.com/file/onuHbJL39i2be0OosK4vYX/Moo-Twitter-Discussion-Board?node-id=0%3A1)

### Tutorials

If you'd like to see how the initial project was built please watch the following YouTube video
<a href="https://www.youtube.com/watch?v=E6nljvVKMTc">
<img width="480" src="https://img.youtube.com/vi/E6nljvVKMTc/maxresdefault.jpg">
<br>
▶️ Building Twitter Clone from Scratch | End-to-End Coding Project
</a>

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
