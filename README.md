# Country Index APIs

Provide two endpoints for searching countries and get country detail.

Support both GraphQL and REST. (I forgot the GraphQL requirement at the beginning, so implemented REST first)

Due to time limit, I only created unit test for `countries.service.ts`, and e2e test for `counteries.controller.ts`

## Learning
1. NestJS
2. TypeScript

## GraphQL endpoint

https://www-country-index-apis-d01.azurewebsites.net/graphql

Sample query:
```
{
  country(code:"nz") {
    name
    alpha2Code
    alpha3Code
    callingCodes
    capital
    altSpellings
  }
  countries(keywords: "nz", limit: 1) {
    name
    alpha2Code
  }
}
```

## REST endpoints

| Path                  | Description                                                            |
|-----------------------|------------------------------------------------------------------------|
| /api/countries        | Searching countries, accept two url parameters, `keywords` and `limit` |
| /api/countries/{code} | Search country by ISO 3166-1 2-letter or 3-letter country code         |

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## License

This project is [MIT licensed](LICENSE).
