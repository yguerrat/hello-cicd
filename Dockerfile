FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY src ./src
USER node
ENV PORT=3000
EXPOSE 3000
CMD ["node", "src/index.js"]
