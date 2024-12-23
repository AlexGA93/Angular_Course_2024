import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  public title: string = "By Country Name";
  public placeholder: string = "Search Countries By Country Name";
  public isLoading: boolean = false;
  public countries: Country[] = [];
  public initialValue: string = "";

  constructor( private cs: CountriesService ){}

  ngOnInit(): void {
    this.countries = this.cs.cacheStore.byCountries.countries;
    this.initialValue = this.cs.cacheStore.byCountries.term;
  }

  public searchByCountryName( value: string ): void {
    this.isLoading = true;
    this.cs.searchCountryRequest( "name", value ).subscribe( (countries: Country[]) => {
      this.countries = countries;
      this.isLoading = false;
    })
  }
}
