FROM node:19-alpine
WORKDIR /app
EXPOSE 3003

COPY package.json package.json
RUN yarn install
COPY . .

CMD ["node", "index"]