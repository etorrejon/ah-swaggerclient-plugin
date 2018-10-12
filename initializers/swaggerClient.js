const {Initializer, api} = require('actionhero');
const request = require('request-promise-native');
const swaggerNodeClient = require('swagger-node-client');

module.exports = class SwaggerClient extends Initializer {
  constructor () {
    super();
    this.name = 'SwaggerClient';
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize () {
    const apis = api.config.swaggerClient.apis;

    apis.forEach(async (api) => {
        const swaggerDoc = await request.get(api.swaggerDocUrl);
        // todo: read swagger spec and generate a client
    });

    api.clients = [];
  }

  async start () {
      api.log('started');
  }

  async stop () {
      api.log('stopped');
  }
}