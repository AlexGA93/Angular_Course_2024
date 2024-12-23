import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country, Translation } from '../../interfaces';

interface countryTranslation {
  key: string;
  value: string;
}

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  country?: Country;
  countryTranslations?: countryTranslation[];

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private cs: CountriesService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.cs.searchByAlphaCode( id ) )
    )
    .subscribe( country => {
      // if there is a null response (error) we redirect to mai nroute
      if (!country) {
        return this.router.navigateByUrl('');
      }


       this.country = country;

       this.countryTranslations = this.assignTranslations(this.country.translations)
       return;
    })
  }

  private assignTranslations(translations: { [key: string]: Translation }): countryTranslation[] {
    const keys = Object.keys(translations);
    const values = Object.values(translations);
    let result = [];

    for (let i = 0 ; i < values.length ; i++) {
      result.push({ key: keys[i], value: values[i].common });
    }
    
    return result;
  }
}
