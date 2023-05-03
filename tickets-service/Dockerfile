# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY \
  .eslintrc.js \
  .prettierrc \
  .sequelizerc \
  nest-cli.json \
  package*.json \
  ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

COPY src/modules/database/migrations/ /app/dist/modules/database/migrations/
COPY src/config/ /app/dist/config/