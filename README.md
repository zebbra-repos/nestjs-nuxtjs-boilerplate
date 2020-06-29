# NestJS NuxtJs Boilerplate

[![Build Status](https://drone.zebbra.ch/api/badges/zebbra-repos/nestjs-nuxtjs-boilerplate/status.svg)](https://drone.zebbra.ch/zebbra-repos/nestjs-nuxtjs-boilerplate)

> NestJS and NuxtJS starter boilerplate

## Project structure

| Folder    | Description                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`       | Contains project configuration files as well as typescript and linting specifications which are applied to both (NestJS and NuxtJS) applications. |
| `/client` | Contains the NuxtJS application directory as described [here](https://nuxtjs.org/guide/directory-structure).                                      |
| `/server` | Contains the NestJS application directory as described [here](https://docs.nestjs.com/first-steps).                                               |

## What's included

### NuxtJS Frontend

- [@nuxtjs/pwa](https://pwa.nuxtjs.org) Supercharge Nuxt with a heavily tested, updated and stable PWA solution
- [@nuxtjs/stylelint-module](https://github.com/nuxt-community/stylelint-module) Stylelint module for NuxtJS
- [@nuxtjs/vuetify](https://github.com/nuxt-community/vuetify-module) Vuetify Module for NuxtJS
- [@nuxt/typescript-build](https://typescript.nuxtjs.org/guide/setup.html#installation) NuxtJS TypeScript Build Support
- [@nuxt/typescript-runtime](https://typescript.nuxtjs.org/guide/runtime.html#installation) NuxtJS TypeScript Runtime Support
- [nuxt-composition-api](https://composition-api.now.sh/) Use Vue 3 Composition API with Nuxt-specific features
- [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) TypeScript/ES7 Decorators to create Vuex modules declaratively

#### Also interesting for NuxtJS

- [@nuxtjs/style-resources](https://github.com/nuxt-community/style-resources-module#readme) Handling scss, sass, and stylus files
- [nuxt-webfontloader](https://github.com/Developmint/nuxt-webfontloader#readme) Efficient web font loading
- [@aceforth/nuxt-optimized-images](https://aceforth.com/docs/nuxt-optimized-images/) Automatically optimizes images used in NuxtJS projects (JPEG, PNG, SVG, WebP and GIF)
- [@nuxtjs/sentry](https://github.com/nuxt-community/sentry-module#readme) Sentry module for NuxtJS
- [@vue/apollo-composable](https://v4.apollo.vuejs.org/guide-composable/) Integrate GraphQL in your Vue.js apps the composable way

### NestJS Backend

- [nestjs-pino](https://github.com/iamolegga/nestjs-pino) Platform agnostic logger for NestJS based on Pino with request context in every log

#### Also interesting for NestJS

- [@ntegral/nestjs-sentry](https://www.npmjs.com/package/@ntegral/nestjs-sentry) Sentry module for NestJS

## Production Setup

> This project is managed with helm v3  
> Replace `nest-nuxt-boilerplate` with your `awesome-project-name` in `/deploy`

1. Create shared namespace

   ```bash
   kubectl create ns demo
   ```

1. Copy `deploy/secrets.example.yaml` to

   - deploy/secrets.yaml

1. Deploy secrets

   ```bash
   kubectl apply -n demo -f deploy/secrets.yaml
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
