import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit {

  public myForm: FormGroup = this.formBuilder.group({
    region:   ['', Validators.required],
    country:  ['', Validators.required],
    border:   ['', Validators.required],
  });

  public countriesByRegion: SmallCountry[] = [];
  public bordersByCountries: SmallCountry[] = [];

  constructor( 
    private formBuilder: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  // get regions from service
  get regions(): Region[] {
    return this.countriesService.regions;
  }

  // function to deal with regions input changes
  public onRegionChanged(): void {
    // calling to the form changing value's observable
    this.myForm.get('region')?.valueChanges
    // concatenating region response to make the http request
    .pipe(
      // set country value to "" when we select region
      tap(() => this.myForm.get('country')?.setValue('')),
      // tap((region) => console.log("choosen region: ",region)),
      switchMap( region => this.countriesService.getCountriesByRegion(region) )
    )
    .subscribe( ( countries ) => this.countriesByRegion = [...countries])
  }

  // function to deal with country input changes
  public onCountryChanged(): void {
    // calling to the form changing value's observable
    this.myForm.get('country')?.valueChanges
    // concatenating region response to make the http request
    .pipe(
      // set country value to "" when we select region
      tap(() => this.myForm.get('border')?.setValue('')),
      // filter the proccess to not contiue if conditio nis not true
      filter((value: string) => value.length > 0),
      // tap((region) => console.log("choosen region: ",region)),
      switchMap( alpha => this.countriesService.getCountryByAlphaCode(alpha) ),
      // concatenate with another service function
      switchMap( country => this.countriesService.getCountryBordersByCodes(country.borders) ),
    )
    .subscribe( ( countries ) => this.bordersByCountries = countries)
  }
}
