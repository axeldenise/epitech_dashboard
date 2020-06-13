FROM node:12.17.0
WORKDIR /app
COPY . /app
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait
RUN npm install
EXPOSE 8080
CMD /wait && npm run serve
