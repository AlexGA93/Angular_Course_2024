import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor(private httpCLient: HttpClient) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    // javascript new feature... structured clone
    return structuredClone(this.user);
  }

  public login(email: string, password: string): Observable<User> {
    return this.httpCLient.get<User>(`${this._baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', user.id.toString()))
      );
  }

  public logout() {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean> {

    if ( !localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token');

    return this.httpCLient.get<User>(`${ this._baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ),
        catchError( err => of(false) )
      );

  }

}
