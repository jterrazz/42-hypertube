# 42-hypertube

A peer to peer streaming website made with ReactJS and NodeJS.
It allows you to beautifully search a torrent database and to stream the file directly into your browser.

Disclaimer: This application was created for learning at the 42 Paris School. For legal reasons, you shouldn't use it in production.

## Starting guide

### Requirements
- [nodeJS >12.0](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)

```bash
yarn # Installs dependencies. 

# cd ./web or cd ./server
yarn dev # Starts a hot reload environment
yarn start # Uses this in production to start the process
```

## Implementation

### Backend
REST compliant API using:
- `NodeJS` with the framework `koa`.
    - ES6 syntax
    - `typescript`
    - `nodemon` for hot reloading the development environment
- MongoDB

Useful links:
- Design ...
- [API Documentation](https://app.swaggerhub.com/apis/jterrazz/42-hypertube/1.0.0), using swagger and OpenAPI 3.0.0.
- [Database schema](https://drawsql.app/jterrazz/diagrams/42-hypertube)
- [Dummy API](https://www.mockapi.io/projects/5d5d524b6cf1330014fead51)

### Frontend
Web app with server rendering made with NextJS (and ReactJS).

### File structure
The root `package.json` is here to enforce linting rules on each commits. `husky` calls `lint-stagged` for every javascript staged file.

Linting is made with a mix of basic react/typescript `eslint` rules and the `prettier` syntax.

## Resources

### Fundamentals
- [The fundamentals of Javascript](https://medium.com/nybles/javacript-fundamentals-52cfafda60a2)
- [New features of ES6](https://medium.com/beginners-guide-to-mobile-web-development/introduction-to-es6-c4422d3c5664)
- [The fundamentals of ReactJS](https://www.taniarascia.com/getting-started-with-react/)
- [NPM/Yarn package.json cheatsheet](https://medium.com/@Nasita_Haque/package-json-cheat-sheet-4fe1b8baa102)
- [Get started with MongoDB](https://www.freecodecamp.org/news/learn-mongodb-a4ce205e7739/)

### Design patterns
- [Atomic design for front-end components](https://medium.muz.li/building-design-systems-with-atomic-design-93a13286f676)

### Go further
- [Master ReactJS](https://medium.mybridge.co/learn-react-js-from-top-50-articles-for-the-past-year-v-2019-baaacfc521c)
- [Linting with ESLint and Prettier](https://medium.com/javascript-scene/streamline-code-reviews-with-eslint-prettier-6fb817a6b51d)
