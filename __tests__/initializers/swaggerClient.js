const path = require('path');
const ActionHero = require('actionhero');
const actionhero = new ActionHero.Process();

describe('swaggerClient', () => {

  describe('when initializing', () => {

    let api;
    let configuredApis;

    beforeEach(async () => {
      configuredApis = [
        {
          name: 'springfieldApi',
          baseUrl: 'https://springfieldpower.com',
          docPath: '/api/swagger/'
        },
        {
          name: 'northHaverbrookApi',
          baseUrl: 'https://northhaverbrook.com',
          docPath: '/api/swagger/'
        }
      ];

      const configChanges = {
        swaggerClient: {
          apis: configuredApis.map(api => {
            return {
              name: api.name,
              swaggerDocUrl: `${api.baseUrl}${api.docPath}`
            };
          })
        },
        plugins: {
          'ah-swaggerclient-plugin': { path: path.join(__dirname, '..', '..') }
        }
      };

      mockSwaggerClient = jest.mock('swagger-client', () => {
        return () => { return {
            this: 'is a fake swagger client'
          };
        };
      });

      api = await actionhero.start({ configChanges });
    });

    afterEach(async () => {
      await actionhero.stop();
    });

    it('creates a client for each configured API and adds it to the global "api" object', async () => {
      expect(Object.keys(api.swaggerClients).length).toEqual(configuredApis.length);
    });

  });

});
