FROM node:12

WORKDIR /usr/src/gtfs-service-area

COPY package.json package.json
RUN npm install
