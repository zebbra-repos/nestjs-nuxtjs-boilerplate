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

ENV HTTP_GRAPHQL_ENDPOINT=https://nest-nuxt-boilerplate.demo.zebbra.ch:3000/graphql
ENV WS_GRAPHQL_ENDPOINT=ws://nest-nuxt-boilerplate.demo.zebbra.ch:3000/graphql

# Build application
ADD . /src
RUN yarn build

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

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["yarn", "start:prod"]
