import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country, Region } from '../../interfaces';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  public title: string = "Countries By Region";
  public placeholder: string = "Search Countries By Region";
  public isLoading: boolean = false;
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region; 
  public initialValue: string = ""; 

  constructor( private cs: CountriesService ){}

  ngOnInit(): void {
    this.countries = this.cs.cacheStore.byRegion.countries;
    this.initialValue = this.cs.cacheStore.byRegion.term;
  }

  public searchByRegion( value: Region ): void {
    this.isLoading = true;

    this.selectedRegion = value;

    this.cs.searchCountryRequest( "region", value ).subscribe( (countries: Country[]) => {
      this.countries = countries;
      this.isLoading = false;
    })
  }
}
