const {Initializer, api} = require('actionhero');

module.exports = class SwaggerClient extends Initializer {
  constructor () {
    super();
    this.name = 'SwaggerClient';
    this.loadPriority = 100;
    this.startPriority = 100;
    this.stopPriority = 100;
  }

  async initialize () {
      api.log('initialized');
  }

  async start () {
      api.log('started');
  }

  async stop () {
      api.log('stopped');
  }
}