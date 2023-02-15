import { PactV3 } from '@pact-foundation/pact';

const MOCK_SERVER_HOST = '127.0.0.1';
const MOCK_SERVER_PORT = 1234;

export class PactWrapper {
  private readonly mockServerUrl = `http://${MOCK_SERVER_HOST}:${MOCK_SERVER_PORT}`;

  private readonly provider: PactV3;

  public constructor(providerName: string) {
    this.provider = new PactV3({
      consumer: 'ui',
      provider: `${providerName}`,
      host: MOCK_SERVER_HOST,
      port: MOCK_SERVER_PORT,
      spec: 3,
      dir: 'dist/pacts',
      logLevel: 'warn'
    });
  }

  public getProvider() {
    return this.provider;
  }

  public getMockServerUrl() {
    return this.mockServerUrl;
  }
}