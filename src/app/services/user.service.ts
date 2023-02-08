import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from './user';

export const PATH = '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path = PATH;

  public constructor(private httpClient: HttpClient) {
  }

  public setUrlPrefix(prefix: string) {
    this.path = `${prefix}${this.path}`;
  }

  public create(resource: User): Observable<string> {
    return this.httpClient.post<User>(this.path, resource).pipe(
      map(data => data.id));
  }

  public get(id: string): Observable<User> {
    const path = `${this.path}/${id}`;
    console.log(`**** UserService.get(): ${path}`);
    return this.httpClient.get<User>(path).pipe(tap( (param) => {
      console.log(`**** UserService.get(): Pipe: ${param}`);
    }));
  }

  public update(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.path}/${user.id}`, user);
  }
}
