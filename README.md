# 42-hypertube

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

## Resources

Read more about this project reading the [wiki](https://github.com/jterrazz/42-hypertube/wiki).

### Fundamentals

- Javascript: [The fundamentals](https://medium.com/nybles/javacript-fundamentals-52cfafda60a2) & [Features of ES6](https://medium.com/beginners-guide-to-mobile-web-development/introduction-to-es6-c4422d3c5664)
- [The fundamentals of ReactJS](https://www.taniarascia.com/getting-started-with-react/)
- [NPM/Yarn package.json cheatsheet](https://medium.com/@Nasita_Haque/package-json-cheat-sheet-4fe1b8baa102)
- [Get started with MongoDB](https://www.freecodecamp.org/news/learn-mongodb-a4ce205e7739/)
- [Mastering Koa Middleware](https://medium.com/netscape/mastering-koa-middleware-f0af6d327a69)
- [Joi validation](https://medium.com/@panayiotisgeorgiou/joi-validation-tutorial-90d163a78bc)

### Go further

- [Atomic design for front-end components](https://medium.muz.li/building-design-systems-with-atomic-design-93a13286f676)
- [Master ReactJS](https://medium.mybridge.co/learn-react-js-from-top-50-articles-for-the-past-year-v-2019-baaacfc521c)
- [Linting with ESLint and Prettier](https://medium.com/javascript-scene/streamline-code-reviews-with-eslint-prettier-6fb817a6b51d)

## Credits 👩‍💻

- @plogan - Front and back
- @abbensid - Mostly frontend
- @jterrazz - Mostly backend 
