import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { UserService } from './user.service';
import { mockUser1, mockUser2 } from './user.service.mock.spec';
import { PactWrapper } from '../utils/pact-wrapper';
import { addInteractionGetUser, addInteractionGetAllUsers } from './user.service.pact.interactions.spec';

describe('UserServicePact', () => {
  let pact: PactWrapper;
  let service: UserService;

  beforeAll((done) => {
    pact = new PactWrapper('user-service');
    // setTimeout(done, 2000); // Required for slower CI environments
    done();
  });

  beforeEach((done) => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(UserService);
    service.setUrlPrefix(pact.getMockServerUrl());
    done();
  });

  describe('get()', () => {
    beforeAll((done) => {
      addInteractionGetUser(pact.getProvider());
      done();
    });

    // Using promise as it's not working when done() callback is used.
    it('should get a User', () => {
      return pact.getProvider().executeTest(async (_mockServer) => {
        return new Promise<void>((resolve, reject) => {
          service.get(mockUser1.id).subscribe({
            next: (response) => {
              expect(response).toEqual(mockUser1);
              resolve();
            },
            error: (error: HttpErrorResponse) => {
              reject(error);
            },
          });
        });
      });
    });

    /*
    // Using done callback, test fails.
    it('should get a User using done callback', (done) => {
      pact.getProvider().executeTest(async (_mockServer) => {
        service.get(mockUser1.id).subscribe({
          next: (response) => {
            expect(response).toEqual(mockUser1);
            done();
          },
          error: (error: HttpErrorResponse) => {
            done();
          },
        });
      }).then(() => {
        console.log('Then called');
      });
    });
    */
  });

  describe('getAll()', () => {
    beforeAll((done) => {
      addInteractionGetAllUsers(pact.getProvider());
      done();
    });

    // Using promise as it's not working when done() callback is used.
    it('should get all Users', () => {
      return pact.getProvider().executeTest(async (_mockServer) => {
        return new Promise<void>((resolve, reject) => {
          const allUsers = [mockUser1, mockUser2];
          service.getAll().subscribe({
            next: (response) => {
              expect(response).toEqual(allUsers);
              resolve();
            },
            error: (error: HttpErrorResponse) => {
              reject(error);
            },
          });
        });
      });
    });
  });
});
