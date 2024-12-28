import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{

  constructor(
    private hs: HeroesService,
    private ar: ActivatedRoute,
    private rt: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  // getter
  get currentHero(): Hero{
    return this.heroForm.value as Hero;
  }

  ngOnInit(): void {
    if (!this.rt.url.includes('edit')) {
      console.log('no tiene edit');
      return;
    };

    this.ar.params.pipe(
      switchMap( ({ id }) => this.hs.getHeroById(id) )
    ).subscribe( hero => {
      console.log("hero", hero);
      
      if (!hero) return this.rt.navigateByUrl('/');
      this.heroForm.reset(hero);
      return;
    })
  }

  // reactive form
  public heroForm = new FormGroup({
    id:               new FormControl(''),
    superhero:        new FormControl('', { nonNullable: true }),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  });

  public publishers = [
    { id: "DC Comics", desc: "DC - Comics" },
    { id: "Marvel Comics", desc: "Marvel - Comics" },
  ];

  public onSubmit(): void {
    if ( this.heroForm.invalid ) return;

    
    if (this.currentHero.id) {
      this.hs.updateHero(this.currentHero)
      .subscribe( hero => {
        // TODO: shock snackbar
        this.showSnackBar(`${ hero.superhero } updated!`);
      });

      return;
    }

    this.hs.addHero(this.currentHero)
    .subscribe( hero => {
      // TODO: show cnackbar and navigate to /heroes/edit/:id
      this.rt.navigate(['/heroes/edit', hero.id]);
      this.showSnackBar(`${ hero.superhero } created!`);
    });

  }

  public showSnackBar( message: string ): void {
    this.snackBar.open(message, 'done',{
      duration: 2500,
    });
  }

  public onDeleteHero(): void {
    if (!this.currentHero.id) throw new Error("Hero is required");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result: boolean) => result),
      switchMap(() => this.hs.deleteHeroById(this.currentHero.id)),
      filter(wasDeleted => wasDeleted)
    )
    .subscribe(() => this.rt.navigate(['/heroes']));
  }
}
