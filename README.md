# 42-hypertube

A peer to peer streaming website made with ReactJS and NodeJS.
It allows you to beautifully search a torrent database and to stream the file directly into your browser.

## Starting guide

### Requirements
- NodeJS 12: `brew install node`
- yarn: `brew install yarn`

Simply run `yarn` to install dependencies. For the client and server, `yarn dev` will start a hot reload environment. Use `yarn start` when the project no longer requires changes.

## Implementation

### Backend
REST API made with NodeJS, Koa and MongoDB. We use `typescript` and `nodemon` for hot reloading.

Useful links:
- Design ...
- [API Documentation](https://app.swaggerhub.com/apis/jterrazz/42-hypertube/1.0.0), using swagger and OpenAPI 3.0.0.
- [Database schema](https://drawsql.app/jterrazz/diagrams/42-hypertube)
- [Dummy API](https://www.mockapi.io/projects/5d5d524b6cf1330014fead51)

```bash
cd server
yarn start # or dev
```

### Frontend
Web app with server rendering made with NextJS (and ReactJS).

```bash
cd web
yarn start # or dev
```

### Others
The root package.json is here to enforce linting rules on commits. `husky` calls `lint-stagged` for every javascript staged file.

The linting rules are composed of basic eslint checks and enforces the Prettier syntax.

### TODO
- [Check against all XSS attacks](https://stackoverflow.com/questions/33644499/what-does-it-mean-when-they-say-react-is-xss-protected)
