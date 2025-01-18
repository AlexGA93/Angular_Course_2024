import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { UserRequestType, UserType } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = "https://reqres.in/api/users";
  // dependences injection
  private http = inject(HttpClient);

  getUserById( id: number): Observable<UserType> {
    return this.http.get<UserRequestType>(`${this.baseUrl}/${id}`)
    .pipe(
      map( ( response: UserRequestType ) => response.data),
      // tap( (info) => console.log(info) )
    );
  }
}
