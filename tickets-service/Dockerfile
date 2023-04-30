# This stage is used as a target in Lotic's global docker-compose at https://github.com/Lotic-ai/lotic-configs/blob/main/docker-compose.yml
FROM node:18.13.0-alpine AS dev
WORKDIR /app

# add necessary packages for building
RUN apk add --no-cache --upgrade alpine-sdk python3

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
RUN npm install

RUN npm run migrate

# build from source
RUN npm run build

# copy migrations
COPY src/modules/database/migrations/ /app/dist/modules/database/migrations/

# prune dev dependencies, keep production dependencies
RUN npm prune --production


FROM node:18.13.0-alpine AS prod
WORKDIR /app

# copy production-relevant configuration files
COPY package.json ./

# copy all dependencies
COPY --from=build /app/node_modules/ node_modules/

# copy compiled source
COPY --from=build /app/dist dist/

# CMD should prefer to call node directly, not through a yarn script
CMD ["node", "dist/main.js"]