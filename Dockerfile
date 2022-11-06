FROM node:latest

WORKDIR /src/backend

COPY package*.json ./

COPY . .

ENV NODE_ENV production

RUN npm install

RUN npm i -g @vercel/ncc

RUN npm run build

EXPOSE 8080

CMD ["node", "./dist/index.js"]