import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { count } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {
  public title: string = "Countries By Capital";
  public placeholder: string = "Search Countries By Capital";
  public isLoading: boolean = false;
  public countries: Country[] = [];
  public initialValue: string = "";

  constructor( private cs: CountriesService ){}

  ngOnInit(): void {
    this.countries = this.cs.cacheStore.byCapital.countries;
    this.initialValue = this.cs.cacheStore.byCapital.term;
  }

  public searchByCapital( value: string ): void {
    this.isLoading = true;
    this.cs.searchCountryRequest( "capital", value ).subscribe( (countries: Country[]) => {
      this.countries = countries;
      this.isLoading = false;
    })
  }
}
