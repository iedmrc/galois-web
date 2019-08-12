# Build frontend
FROM node:lts-alpine as frontend
WORKDIR /app
COPY frontend ./
RUN npm install && npm run build


# Run backend
FROM node:lts-alpine as backend
RUN mkdir -p /galois && chown -R node:node /galois
WORKDIR /galois

COPY backend/ ./
COPY --from=frontend --chown=node:node /app/dist/ /galois/public

USER node

RUN npm install

CMD [ "npm", "run", "start" ]