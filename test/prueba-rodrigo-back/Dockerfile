FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Puerto backend
EXPOSE 4000

# Comando para iniciar back
CMD ["node", "src/index.js"]
