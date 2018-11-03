const { Initializer, api } = require('actionhero');
const assert = require('assert');
const Swagger = require('swagger-client');

module.exports = class SwaggerClient extends Initializer {
  constructor () {
    super();
    this.name = 'swaggerClient';
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize () {
    assert(api);
    api.swaggerClients = {};


    const configuredApis = api.config.swaggerClient.apis;
    configuredApis.forEach(async (configuredApi) => {
      assert(!!configuredApi);
      assert(!!configuredApi.name);
      assert(!!configuredApi.swaggerDocUrl);

      const swaggerClient = await Swagger(configuredApi.swaggerDocUrl);
      api.swaggerClients[configuredApi.name] = swaggerClient;
    });
  }
};