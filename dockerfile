FROM mhart/alpine-node:10

WORKDIR /app

COPY . .

COPY package*json ./

RUN yarn run build

CMD [ "yarn", "start" ]