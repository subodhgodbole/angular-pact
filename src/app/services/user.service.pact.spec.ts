import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BASE_URL, UserService } from './user.service';
import { User } from './user';
import { Matchers, PactWeb} from '@pact-foundation/pact-web';

describe('UserServicePact', () => {
  let provider: PactWeb;
  let service: UserService;

  beforeAll((done) => {
    provider = new PactWeb({
      port: 1234
    });

    // Required for slower CI environments
    setTimeout(done, 2000);

    // Required if run with `singleRun: false`
    provider.removeInteractions();
  });

  afterAll((done) => {
    provider.finalize().then(
      () => {
        done();
      },
      (err: Error) => {
        done.fail(err);
      }
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(UserService);
  });

  describe('get()', () => {
    const userId = '1';
    const expectedUser: User = {
      id: userId,
      firstName: 'Me',
      lastName: 'Me'
    };

    beforeAll((done) => {
      provider
        .addInteraction({
          state: `Fetch user`,
          uponReceiving: 'A request to GET a User',
          withRequest: {
            method: 'GET',
            path: `${BASE_URL}/${userId}`,
            headers: {
              'Content-Type': 'application/json'
            }
          },
          willRespondWith: {
            status: 200,
            body: Matchers.somethingLike(expectedUser),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        })
        .then(done, (error: HttpErrorResponse) => {
          done.fail(error);
        });
    });

    it('should get a User', (done) => {
      service.get(userId).subscribe({
        next: (response) => {
          expect(response).toEqual(expectedUser);
          done();
        },
        error: (error) => {
          done.fail(error);
        }
      });
    });
  }); 
});