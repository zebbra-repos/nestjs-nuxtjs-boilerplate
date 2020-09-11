##########################################################################
#### BUILD CONTAINER
##########################################################################
FROM node:14.2.0-slim AS builder

RUN apt-get update && \
  apt-get -y install g++ build-essential python && \
  apt-get clean

# Configure the main working directory. This is the base
# directory used in any further RUN, COPY, and ENTRYPOINT
# commands.
WORKDIR /src

# Install build dependencies
ADD package.json yarn.lock /src/
RUN yarn install

# Build application
ADD . /src
RUN yarn build

# We only want the dist folder, remove the rest
RUN find ./dist/app/client -mindepth 1 ! -regex '^./dist/app/client/dist.*' -delete

##########################################################################
#### RUNTIME CONTAINER
##########################################################################
FROM node:14.2.0-slim

RUN apt-get update && \
  apt-get -y install g++ build-essential python && \
  apt-get clean

# Configure the main working directory. This is the base
# directory used in any further RUN, COPY, and ENTRYPOINT
# commands.
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Install runtime dependencies
ADD package.json yarn.lock /app/
RUN yarn install

# Copy app from former build stage
COPY --from=builder /src/dist /app/dist

CMD ["yarn", "start:prod"]
