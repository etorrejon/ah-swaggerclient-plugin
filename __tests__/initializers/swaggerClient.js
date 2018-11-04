const path = require('path');
const url = require('url');
const nock = require('nock');
const ActionHero = require('actionhero');
const actionhero = new ActionHero.Process();

const createApiMocks = apis => {
  apis.forEach(configuredApi => {
    const parsedUrl = url.parse(configuredApi.swaggerDocUrl);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}/`;
    const path = parsedUrl.path;

    nock(baseUrl).get(path).reply(200, require('./swaggerDoc.json'));
  });
};

const buildConfigChanges = configuredApis => {
  return {
    swaggerClient: {
      apis: configuredApis.map(api => {
        return {
          name: api.name,
          swaggerDocUrl: api.swaggerDocUrl
        };
      })
    },
    plugins: {
      'ah-swaggerclient-plugin': { path: path.join(__dirname, '..', '..') }
    }
  };
};

describe('swaggerClient', () => {
  describe('when initializing', () => {
    let api;
    let configuredApis;

    beforeEach(async () => {
      configuredApis = [
        {
          name: 'springfieldApi',
          swaggerDocUrl: 'https://springfieldpower.com/api/swagger/'
        },
        {
          name: 'northHaverbrookApi',
          swaggerDocUrl: 'https://northhaverbrook.com/api/swagger/'
        }
      ];

      createApiMocks(configuredApis);

      const configChanges = buildConfigChanges(configuredApis);
      api = await actionhero.start({ configChanges });
    });

    afterEach(async () => {
      await actionhero.stop();
    });

    it('creates a client for each configured API and adds it to the global "api" object', async () => {
      expect(Object.keys(api.swaggerClients).length).toEqual(configuredApis.length);
      configuredApis.forEach(configuredApi => {
        expect(api.swaggerClients[configuredApi.name]).toBeDefined();
      });

      const springfieldApi = api.swaggerClients.springfieldApi;

      expect(springfieldApi.apis.pet).toBeDefined();
      expect(springfieldApi.apis.pet.addPet).toBeDefined();
      expect(typeof api.swaggerClients.springfieldApi.apis.pet.addPet).toEqual('function');
    });
  });
});
