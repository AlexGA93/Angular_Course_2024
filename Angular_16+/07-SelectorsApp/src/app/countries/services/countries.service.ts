import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { catchError, combineLatest, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _baseUrl: string = environments.baseUrl;

  // declare private regions array (not possible to access to this array)
  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

  constructor( private _http: HttpClient ) {}

  // declare get to access to the regions array
  get regions(): Region[] {
    // returning a copy of the array
    return [...this._regions];
  }

  public getCountriesByRegion(region: Region): Observable<SmallCountry[]> {

    // check if region is valid
    if (!region || region.trim() === '') {
      return of([]);
    }
  
    // Compose request url
    const providedUrl: string = `${this._baseUrl}/region/${region}?fields=cca3,name,borders`;
  
    // make http request
    return this._http.get<Country[]>(providedUrl)
    .pipe(
      // take countries and return a new array bilt by the SmallCountry data
      map((countries: Country[]) => countries.map(country => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? []
      }))),
      // tap(response => console.log('HTTP Response:', response)),
      // dealing with errors
      catchError(error => {
        console.error('HTTP Error:', error);
        return throwError(() => new Error(error));
      })
    );
  }
  
  public getCountryByAlphaCode( alphaCode: string ): Observable<SmallCountry> {
  
    // Compose request url  
    const providedUrl: string = `${this._baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    
    return this._http.get<Country>(providedUrl)
    .pipe(
      map((country) => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? []
      })),
      catchError(error => {
        console.error('HTTP Error:', error);
        return throwError(() => new Error(error));
      })
    )
  }

  getCountryBordersByCodes( borders: string[] ): Observable<SmallCountry[]> {
    if ( !borders || borders.length === 0 ) return of([]);

    const countriesRequests:Observable<SmallCountry>[]  = [];

    borders.forEach( code => {
      const request = this.getCountryByAlphaCode( code );
      countriesRequests.push( request );
    });


    return combineLatest( countriesRequests );
  }

}
