FROM node:21.5.0

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN yarn install

COPY entrypoint.sh /usr/bin
RUN chmod +x /usr/bin/entrypoint.sh 
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3333

CMD ["yarn", "start"]