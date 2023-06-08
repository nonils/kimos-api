FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 10101
ENV NODE_ENV=docker
CMD ["node", "dist/main"]