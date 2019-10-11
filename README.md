# [IN PROGRESS] 42-hypertube

A web application to search and watch videos. Videos are downloaded through the BitTorrent protocol and played directly in the browser.

*Disclaimer: This application was created for learning purposes at the 42 Paris School. For legal reasons, you should not use it in production.*

## Starting guide

### Requirements
- Docker
#### Simple start
```bash
docker-compose up
```

#### Local development
- [nodeJS >12.0](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)

```bash
# Install dependencies. 
yarn 

# Start a hot reload environment
yarn dev.web
yarn dev.server

# Start in production mode
yarn start.web
yarn start.server
```

## Implementation

### Backend
The hypertube API handles the server logic for the hypertube website. It allows you to search for movies and torrents. The API handles the download and stream of torrents to the client. The user must register to use most of our services.

The API is REST compliant. Build with:
- `NodeJS` - framework `koa`.
    - ES6 syntax
    - `typescript`
    - `nodemon` for hot reloading the development environment
- MongoDB

Useful links:
- [API Documentation](https://documenter.getpostman.com/view/9049212/SVtVV8SF?version=latest#intro)

### Frontend
- [Design board](https://www.figma.com/file/OievEvxLxxB2yETE0bsDA1/hypertube-crea?node-id=0%3A102)
Web app with server rendering made with NextJS (and ReactJS).

### File structure
The root `package.json` is here to enforce linting rules on each commits. `husky` calls `lint-stagged` for every javascript staged file.

Linting is made with a mix of basic react/typescript `eslint` rules and the `prettier` syntax.

## Resources

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

## Credits
- @plogan - Front and back
- @abbensid - Mostly frontend
- @jterrazz - Mostly backend
