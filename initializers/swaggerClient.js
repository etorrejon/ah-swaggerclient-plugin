const { Initializer, api } = require('actionhero');
const Swagger = require('swagger-client');

module.exports = class SwaggerClient extends Initializer {
  constructor () {
    super();
    this.name = 'SwaggerClient';
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;

    api.swaggerClients = {};
  }

  async initialize () {
    const apis = api.config.swaggerClient.apis;

    apis.forEach(async (configuredApi) => {
        const swaggerClient = await Swagger(configuredApi.swaggerDocUrl);
        api.swaggerClients[configuredApi.name] = swaggerClient;
    });
  }

  async start () {
      api.log('started');
  }

  async stop () {
      api.log('stopped');
  }
}