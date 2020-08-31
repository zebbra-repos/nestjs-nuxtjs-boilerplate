# NestJS NuxtJs Boilerplate

[![Build Status](https://drone.zebbra.ch/api/badges/zebbra-repos/nestjs-nuxtjs-boilerplate/status.svg)](https://drone.zebbra.ch/zebbra-repos/nestjs-nuxtjs-boilerplate)

> NestJS and NuxtJS starter boilerplate

## Requirements

- Node.js 14.4.0
- PostgreSQL

## Development

For development the following additional dependencies are required:

- Homebrew (for Mac OS X)
- overmind
- yarn

### Setup

Make sure you have the latest version of `nodenv` (Node.js version manager) by following instruction:

```bash
brew upgrade nodenv
```

Create `development` and `test` databases:

```bash
CREATE DATABASE nest-nuxt-boilerplate-development
CREATE DATABASE nest-nuxt-boilerplate-test
```

Run migrations:

```bash
yarn db:migrate
NODE_ENV=test yarn db:migrate
```

### Project structure

| Folder       | Description                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`          | Contains project configuration files as well as typescript and linting specifications which are applied to both (NestJS and NuxtJS) applications. |
| `app/client` | Contains the NuxtJS application directory as described [here](https://nuxtjs.org/guide/directory-structure).                                      |
| `app/server` | Contains the NestJS application directory as described [here](https://docs.nestjs.com/first-steps).                                               |

### What's included

#### NuxtJS Frontend

- [@nuxtjs/pwa](https://pwa.nuxtjs.org) Supercharge Nuxt with a heavily tested, updated and stable PWA solution
- [@nuxtjs/stylelint-module](https://github.com/nuxt-community/stylelint-module) Stylelint module for NuxtJS
- [@nuxtjs/vuetify](https://github.com/nuxt-community/vuetify-module) Vuetify Module for NuxtJS
- [@nuxt/typescript-build](https://typescript.nuxtjs.org/guide/setup.html#installation) NuxtJS TypeScript Build Support
- [@nuxt/typescript-runtime](https://typescript.nuxtjs.org/guide/runtime.html#installation) NuxtJS TypeScript Runtime Support
- [@nuxtjs/composition-api](https://composition-api.now.sh/) Use Vue 3 Composition API with Nuxt-specific features
- [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) TypeScript/ES7 Decorators to create Vuex modules declaratively
- [@sentry/browser](https://www.npmjs.com/package/@sentry/browser) Sentry integration for browser
- [@nuxtjs/apollo](https://github.com/nuxt-community/apollo-module) Nuxt.js module to use vue-apollo
- [@vue/apollo-composable](https://v4.apollo.vuejs.org/guide/) This library integrates apollo in your Vue components with declarative queries

##### Also interesting for NuxtJS

- [@nuxtjs/style-resources](https://github.com/nuxt-community/style-resources-module#readme) Handling scss, sass, and stylus files
- [nuxt-webfontloader](https://github.com/Developmint/nuxt-webfontloader#readme) Efficient web font loading
- [@aceforth/nuxt-optimized-images](https://aceforth.com/docs/nuxt-optimized-images/) Automatically optimizes images used in NuxtJS projects (JPEG, PNG, SVG, WebP and GIF)

#### NestJS Backend

- [nestjs-pino](https://github.com/iamolegga/nestjs-pino) Platform agnostic logger for NestJS based on Pino with request context in every log
- [@nestjs/config](https://github.com/nestjs/config) Configuration module based on the dotenv package
- [@nestjs/graphq](https://github.com/nestjs/graphql) GraphQL (TypeScript) module for Nest framework
- [@nestjs/passport](https://github.com/nestjs/passport) Passport utilities module for Nest
- [@nestjs/typeorm](https://github.com/nestjs/typeorm) Typeorm module for Nest
- [@nestjs/terminus](https://www.npmjs.com/package/@nestjs/terminus) Integrated healthchecks for Nest
- [@ntegral/nestjs-sentry](https://www.npmjs.com/package/@ntegral/nestjs-sentry) Sentry module for NestJS

## Production Setup for k8s cluster

> This project is managed with helm v3

- Replace `nest-nuxt-boilerplate` with your `awesome-project-name` in `/deploy`
- Replace `your-namespace` with your own k8s namespace

1. Create shared namespace

   ```bash
   kubectl create ns your-namespace
   ```

1. Copy `deploy/secrets.example.yaml` to

   - deploy/secrets.yaml

1. Deploy secrets

   ```bash
   kubectl apply -n your-namespace -f deploy/secrets.yaml
   ```

1. Deploy Helm chart

   ```bash
   cd deploy && helmfile apply
   ```

## Deployment

Push to master branch will trigger new deployment on k8s.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000 (backend) and localhost:5000 (frontend)
$ overmind s

# build for production and launch combinded server (NestJS server serves NuxtJS frontend)
$ yarn build
$ yarn start:prod
```

For detailed explanation on how things work, check out [NestJS docs](https://docs.nestjs.com/) or [NuxtJS docs](https://nuxtjs.org).

## DB Migrations

k8s deployment includes db-migrate-job which will automatically run migrations on each deplyoment. Locally you have to use the following commands to interact with typeorm cli.

```bash
yarn db:migration:generate <migration_name>
yarn db:migrate
yarn db:rollback
```

> To run migrations against test database use `NODE_ENV=test yarn db:migrate`

## Graphql Schema and Operations

We chose to use the Nest.js `code first` approach (see [here](https://docs.nestjs.com/graphql/quick-start)) which means that the `app/server/schemal.gql` file is automatically generated based on the types and resolvers we define in our Nest.js application. Further, we make use of [GraphQL Code Generator](https://graphql-code-generator.com/) to generate types and queries on the fly for the client based on the server's `schema.gql` file and the operations defined in one of the following files:

- `app/client/apollo/mutations.graphql`
- `app/client/apollo/queries.graphql`
- `app/client/apollo/subscriptions.graphql`

The results are written to `app/client/apollo/generated-operations.ts` and can be used as-is (see [here](https://graphql-code-generator.com/docs/plugins/typescript-vue-apollo) for more information).

If you run the application with `overmind s` then `generated-operations.ts` will be re-generated if there are changes to one of the files listed above. Otherwise you have to run `yarn generate:types` manually to re-generate the output file.
