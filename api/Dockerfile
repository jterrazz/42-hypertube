FROM node:12-alpine

RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node . .
RUN rm -rf node_modules
RUN yarn
