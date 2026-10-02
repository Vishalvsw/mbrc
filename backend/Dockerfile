FROM node:20-alpine AS b
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
COPY . .
RUN npx prisma generate && npm run build
FROM node:20-alpine
WORKDIR /app
COPY --from=b /app/node_modules ./node_modules
COPY --from=b /app/dist ./dist
COPY --from=b /app/prisma ./prisma
COPY package*.json ./
EXPOSE 4000
CMD ["node", "dist/index.js"]
