const path = require('path');
const ActionHero = require('actionhero');
const actionhero = new ActionHero.Process();
const nock = require('nock');

describe('swaggerClient', () => {

  describe('when initializing', () => {

    let api;
    let configuredApis;
    const requestMocks = [];
    const sampleSwaggerDoc = require('./swaggerDoc.json');


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

      configuredApis.forEach(api => {
        requestMocks.push(nock(api.baseUrl).get(api.docPath).reply(200, sampleSwaggerDoc));
      });

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

      api = await actionhero.start({ configChanges });
    });

    afterEach(async () => {
      await actionhero.stop();
    });

    it('fetches the swagger schema for each configured API', async () => {
      requestMocks.forEach((mock) => {
        expect(mock.isDone()).toEqual(true);
      });
    });

  });

});
