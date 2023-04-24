FROM node:18
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080 
EXPOSE 8081

COPY entrypoint.sh /entrypoint.sh