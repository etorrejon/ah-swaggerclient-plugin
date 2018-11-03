# ah-swaggerclient-plugin

## Generate API clients from Swagger 2.0/Open API 3.0 specifications!

[![CircleCI](https://circleci.com/gh/etorrejon/ah-swaggerclient-plugin.svg?style=svg)](https://circleci.com/gh/etorrejon/ah-swaggerclient-plugin)

This plugin uses the [swagger-client](https://www.npmjs.com/package/swagger-client) library to attach API clients to the ActionHero `api` object.

### To install:
(assuming you have [node](http://nodejs.org/) and NPM installed)

`npm install --save ah-swaggerclient-plugin`

### Configuring the plugin

See `config/swaggerClient.js` for an example. It's pretty easy to do, just provide a name for the API and a URL to the Swagger doc.

e.g.

```
exports.default = {
    swaggerClient: (api) => {
        return {
            apis: [
                {
                    name: 'petStore',
                    swaggerDocUrl: 'https://petstore.swagger.io/v2/swagger.json',
                }
            ]
        };
    }
};
```

You can then access your API like this:

`const petApi = api.swaggerClients.petStore.apis.pet`

See the documentation for [swagger-client](https://github.com/swagger-api/swagger-js#constructor-and-methods) for details on how to call API methods.

### To Test:
`npm test`
