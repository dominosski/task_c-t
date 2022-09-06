FROM node:16
WORKDIR /app
COPY package*.json /app
COPY tsconfig.json /app
EXPOSE 5007
RUN npm install
COPY . .
CMD npm run dev2