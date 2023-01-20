import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

export const BASE_URL = 'rest/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor(private httpClient: HttpClient) {
  }

  public create(resource: User): Observable<string> {
    return this.httpClient.post<User>(BASE_URL, resource).pipe(
        map(data => data.id));
  }

  public get(id: string): Observable<User> {
    return this.httpClient.get<User>(`${BASE_URL}/${id}`);
  }


  public update(user: User): Observable<User> {
    return this.httpClient.put<User>(`${BASE_URL}/${user.id}`, user);
  }
}
