FROM node:14.15.1-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]