FROM node:lts-alpine AS dev
WORKDIR /app

# copy configuration files
COPY \
  .env* \
  .eslintrc.js \
  .prettierrc \
  .sequelizerc \
  nest-cli.json \
  package.json \
  tsconfig.build.json \
  tsconfig.json \
  ./

# copy source code
COPY src/ src/


FROM dev AS build

# install dependencies
RUN npm ci

# build from source
RUN npm run build

# copy migrations
COPY src/modules/database/migrations/ /app/dist/modules/database/migrations/
COPY src/config/ /app/dist/config/

# prune dev dependencies, keep production dependencies
RUN npm prune --production


FROM node:lts-alpine AS prod
WORKDIR /app

# copy production-relevant configuration files
COPY package.json ./

# copy all dependencies
COPY --from=build /app/node_modules/ node_modules/

# copy compiled source
COPY --from=build /app/dist dist/

COPY \
  .env* \
  .eslintrc.js \
  .prettierrc \
  .sequelizerc \
  nest-cli.json \
  package.json \
  tsconfig.build.json \
  tsconfig.json \
  ./

RUN npm install sequelize-cli -g

