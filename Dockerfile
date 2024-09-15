# Stage 1: Build Stage
FROM node:18-alpine 

ARG ENV
ARG DATABASE_CONNECTION_STRING
ARG CALLBACK_URL
ARG CLIENT_ID
ARG CLIENT_SECRET
ARG AUTH_URL
ARG AUTH_TOKEN_URL 
ARG SESSION_SECRET
ARG ENABLE_AUTH
ARG PORT

ENV ENV=$ENV
ENV DATABASE_CONNECTION_STRING=$DATABASE_CONNECTION_STRING
ENV CALLBACK_URL=$CALLBACK_URL
ENV CLIENT_ID=$CLIENT_ID
ENV CLIENT_SECRET=$CLIENT_SECRET
ENV AUTH_URL=$AUTH_URL
ENV AUTH_TOKEN_URL=$AUTH_TOKEN_URL
ENV SESSION_SECRET=$SESSION_SECRET
ENV ENABLE_AUTH=$ENABLE_AUTH
ENV PORT=$PORT

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

# Expose the port Colyseus will be using
EXPOSE $PORT

# Command to start the server with ts-node-dev for live reload
CMD ["node", "build/index.js"]
