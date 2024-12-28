import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'heroes-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor( 
    private hs: HeroesService,
    private ar: ActivatedRoute,
    private rt: Router
  ) {}

  ngOnInit(): void {
    // acces to the url params and use rxjs to concatenate observables
    this.ar.params
    .pipe(
      // delay(1000),
      switchMap( ({ id }) => this.hs.getHero(id))
    )
    .subscribe( hero => {
      if (!hero) return this.rt.navigate(['./list']);

      this.hero = hero;

      console.log({hero});
      
      return;
    })
  }

  public goBack(): void {
    this.rt.navigateByUrl("heroes/list");
  }
}
