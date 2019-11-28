# 42-hypertube

*To learn more about this project, use the [wiki](https://github.com/jterrazz/42-hypertube/wiki) 😜*

A web based application to explore and search torrent providers. Videos are downloaded on the backend using the BitTorrent protocol and streamed to the browser. The front-end features a beautiful discovery page and social features such as comments.

*Disclaimer: This application was made for learning purposes at the 42 Paris School. For legal reasons, this shouldn't be used in the real world.*

## Starting guide

### Requirements

- Docker `>2.0`

You must first create a `.env`  in the `server` folder with the following environment variables.

```dotnet
SERVER_PORT=3000
CLIENT_URL=http://localhost:4242
API_NODE_MAILER_KEY=XXX
API_NODE_MAILER_DOMAIN=XXX.fr
API_THE_MOVIE_DB_KEY=XXX
API_YTS_KEY=XXX
API_GOOGLE_CONSUMER_KEY=XXX
API_GOOGLE_CONSUMER_SECRET=XXX
API_FACEBOOK_APP_ID=XXX
API_FACEBOOK_APP_SECRET=XXX
API_FORTYTWO_APP_ID=XXX
API_FORTYTWO_APP_SECRET=XXX
API_GITHUB_CLIENT_ID=XXX
API_GITHUB_CLIENT_SECRET=XXX
```

#### Start

```bash
docker-compose up
```

#### Development environment

##### Server side

Depends of  `NodeJS 12+` and `yarn`.

```shell
yarn # Installs dependencies
yarn dev # Hot reload API
yarn start # Simple API
yarn lint # Lint with autofix
yarn reset # Clear all temporary files
```

## Implementation

### Server

The **hypertube API** handles all the data needs of the web website. The API provides searches, movie lists, account and stream endpoints. The user must authenticated to use most of our services.

We use `NodeJS` with the framework `koa` and `typescript`. The data is persisted with `MongoDB`.

[API Documentation: click here to view the API endpoints](https://documenter.getpostman.com/view/9049212/SVtVV8SF?version=latest#intro)

### Frontend

The client is served using server side rendering with the `NextJS` framework (`ReactJS`).

### Bonus
- Github authentication
- Custom magnet-link player
- RESTFUL API
- NextJS Server side rendering + ReactJS: Fast first html downloading / page rendering, + web app in the browser
- Captcha for registration
- Docker: one line start

## Credits 👩‍💻

- @plogan - Front and back
- @abbensid - Mostly frontend
- @jterrazz - Mostly backend 
