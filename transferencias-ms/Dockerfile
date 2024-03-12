FROM node

WORKDIR /usr/app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]