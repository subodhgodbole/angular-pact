import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { PATH, UserService } from './user.service';
import { User } from './user';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { AnyTemplate } from '@pact-foundation/pact/src/dsl/matchers';

describe('UserServicePact', () => {
  let provider: PactV3;
  let service: UserService;

  beforeAll((done) => {
    provider = new PactV3({
      consumer: 'consumer-ui',
      provider: 'provider-user-service',
      spec: 3,
      logLevel: 'debug',
    });

    // Required for slower CI environments
    setTimeout(done, 2000);
  });

  beforeEach((done) => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(UserService);
    done();
  });

  describe('get()', () => {
    const userId = '1';
    const expectedUser: User = {
      id: userId,
      firstName: 'Me',
      lastName: 'Me'
    };

    const extectedBody = MatchersV3.like(expectedUser as unknown as AnyTemplate);

    beforeAll((done) => {
      const path = `${PATH}/${userId}`;
      console.log(`**** Adding Interaction with path: ${path}`);

      provider
        .given('Fetch user')
        .uponReceiving('A request to GET a User')
        .withRequest({
          method: 'GET',
          path: path
          // , headers: { Accept: "application/json" }
        })
        .willRespondWith({
          status: 200,
          body: extectedBody
          // , headers: { "Content-Type": "application/json" }
        });

      done();
    });

    it('should get a User', (done) => {
      provider.executeTest(async(mockServer) => {
        console.log(`**** MockServer:: URL: ${mockServer.url}, ID: ${mockServer.id}`);
        service.setUrlPrefix(mockServer.url);

        service.get(userId).subscribe({
          next: (response) => {
            console.debug(response);
            expect(response).toEqual(expectedUser);
            done();
          },
          error: (error: HttpErrorResponse)=> {
            done();
          }
        });
      });
    });
  });
});
