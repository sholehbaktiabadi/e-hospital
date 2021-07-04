# Create node image
FROM node:lts-alpine3.10

# Create app directory
WORKDIR /app

# Copy file to /app directory
COPY . /app

# install pm2
RUN npm install pm2 -g \
    #install nest-cli
    npm install -g @nestjs/cli \
    # compile nest
    && npm run build \
    # Remove dev dependencies
    && npm prune --production --silent \
    # Remove unused file/folder
    && rm -rf src \
    && rm tsconfig.json Dockerfile .dockerignore

# Expose port 10098
EXPOSE 10098

# run pm2-runtime
CMD ["pm2-runtime", "--raw", "ecosystem.config.js"]