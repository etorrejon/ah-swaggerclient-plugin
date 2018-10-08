const path = require('path');
const ActionHero = require('actionhero');
const actionhero = new ActionHero.Process();

let api;

describe('swaggerClient', () => {
  beforeAll(async () => {
    let configChanges = {
      plugins: {
        'ah-swaggerclient-plugin': { path: path.join(__dirname, '..', '..') }
      }
    };

    api = await actionhero.start({ configChanges });
  });

  afterAll(async () => { await actionhero.stop() });

  test('should have booted into the test env', () => {
    expect(process.env.NODE_ENV).toEqual('test');
    expect(api.env).toEqual('test');
    expect(api.id).toBeTruthy();
  });
})
