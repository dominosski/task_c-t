FROM node:16
WORKDIR /app
COPY package*.json /app
COPY tsconfig.json /app
EXPOSE 5672
RUN npm install
COPY . .
CMD ["npm", "start"]