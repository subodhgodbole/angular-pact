import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { mockUser1 } from './user.service.mock.spec';

describe('UserService', () => {
  let service: UserService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'patch', 'post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HttpClient,
        useValue: httpClientSpy
      }]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user', (done) => {
    httpClientSpy.get.and.returnValue(of(mockUser1));
    service.get(mockUser1.id).subscribe({
      next: (user) => {
        expect(user).toEqual(mockUser1);
        done();
      }
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
