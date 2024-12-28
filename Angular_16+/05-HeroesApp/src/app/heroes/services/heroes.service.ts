import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _baseUrl: string = environments.baseUrl;

  constructor( private httpClient: HttpClient ) { }

  public getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this._baseUrl}/heroes`);
  }

  public getHero( heroId: string ): Observable<Hero | undefined> {
    return this.httpClient
    .get<Hero>(`${this._baseUrl}/heroes/${heroId}`)
    .pipe(
      catchError( error => of(undefined) )
    );
  }

  public getSuggestions( query: string ): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${ this._baseUrl }/heroes?q=${ query }&_limit=6`);
  }

  public getHeroById( heroId: string ): Observable<Hero> {
    return this.httpClient.get<Hero>(`${ this._baseUrl }/heroes/${ heroId }`);
  }

  public addHero(hero: Hero) {
    return this.httpClient.post<Hero>(`${this._baseUrl}/heroes`, hero);
  }

  public updateHero( hero: Hero ): Observable<Hero> {
    if (!hero.id) throw Error("Hero is required");
    return this.httpClient.patch<Hero>(`${this._baseUrl}/heroes/${hero.id}`, hero);
  }

  public deleteHeroById(heroId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this._baseUrl}/heroes/${heroId}`)
    .pipe(
      catchError(err => of(false)),
      map(resp => true)
    );
  }

}
