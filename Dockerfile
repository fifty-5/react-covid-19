FROM node:18-alpine

EXPOSE 3000

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app

USER node
COPY package*.json ./
RUN npm i --no-audit
ENV PATH /opt/node_app/node_modules/.bin:$PATH

COPY . .

# start app
CMD ["npm", "start"]