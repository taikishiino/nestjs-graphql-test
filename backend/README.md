# Backend
NestJS,GraphQL,Prisma

## Setup
```bash
$ yarn install
$ docker-compose up
```

## Running the app
```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Test Query
```gql
query Query {
  users {
    id,
    name,
    gender
  }
}
```

## License

Nest is [MIT licensed](LICENSE).
