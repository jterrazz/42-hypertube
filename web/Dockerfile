FROM node:12-alpine

RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node . .
RUN yarn
RUN yarn build
