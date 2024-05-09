FROM node:21.5.0

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]