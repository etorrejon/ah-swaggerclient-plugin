const assert = require('assert');
const { Initializer, api } = require('actionhero');
const Swagger = require('swagger-client');

module.exports = class SwaggerClient extends Initializer {
  constructor () {
    super();
    this.name = 'swaggerClient';
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;

    api.swaggerClients = {};
  }

  async initialize () {
    const apis = api.config.swaggerClient.apis;

    apis.forEach(async (configuredApi) => {
      assert(!!configuredApi);
      assert(!!configuredApi.name);
      assert(!!configuredApi.swaggerDocUrl);

      const swaggerClient = await Swagger(`${configuredApi.swaggerDocUrl}`);
      api.swaggerClients[configuredApi.name] = swaggerClient;
    });
  }
};