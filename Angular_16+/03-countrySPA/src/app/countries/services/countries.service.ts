import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _countriesAPI: string = "https://restcountries.com/v3.1";

  public cacheStore: CacheStore = {
    byCapital:    { term: '', countries: [] },
    byCountries:  { term: '', countries: [] },
    byRegion:     { term: '', countries: [] },
  };

  constructor( private _http: HttpClient ) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem("cacheStore", JSON.stringify( this.cacheStore ))
  }

  private loadFromLocalStorage() {
    const ls = localStorage.getItem("cacheStore");

    if (!ls) return;

    this.cacheStore = JSON.parse(ls!);
  }

  public searchCountryRequest(page: string, term: string): Observable<Country[]> {
    return this._http
    .get<Country[]>(`${this._countriesAPI}/${page}/${term}`)
    .pipe(
      tap( countries => this.cacheMethod(page, term, countries) ),
      tap( () => this.saveToLocalStorage() ),
      catchError( () => of([]))
    )
  }

  // we want to return a single country not an array
  public searchByAlphaCode( alphaCode: string ): Observable<Country | null> {
    return this._http
    .get<Country[]>(`${this._countriesAPI}/alpha/${alphaCode}`)
    .pipe(
      // transform data before send them
      // if we have a correct response we send the first country
      map( countries => countries.length > 0 ? countries[0] : null ),
      // error case - return an observable with a null value
      tap( () => this.saveToLocalStorage() ),
      catchError( () => of(null))
    )
    ;
  }

  private cacheMethod(page: string, term: string, countries: Country[]) {
    switch(page){
      case 'capital':
        this.cacheStore.byCapital = { term, countries };
        break; 
      case 'name':
        this.cacheStore.byCountries = { term, countries  };
        break; 
      case 'region':
        this.cacheStore.byRegion = { term, countries  };
        break; 
    }
  }

}
