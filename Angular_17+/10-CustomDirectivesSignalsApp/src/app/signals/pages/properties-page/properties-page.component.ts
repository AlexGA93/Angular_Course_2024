import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { UserType } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnInit, OnDestroy{

  public fullName = computed( () => `${ this.userSignal().first_name } ${ this.userSignal().last_name }` );

  public userChangedEffect = effect( () => {
    console.log( `${ this.userSignal().first_name } - ${ this.counter() } ` );
  } );

  public counter = signal( 10 );

  public userSignal = signal<UserType>({
    "id": 1,
    "email": "george.bluth@reqres.in",
    "first_name": "George",
    "last_name": "Bluth",
    "avatar": "https://reqres.in/img/faces/1-image.jpg"
  });

  ngOnInit(): void {
    setInterval( () => {
      this.counter.update( current => current + 1 );
      if ( this.counter() > 15 )
        this.userChangedEffect.destroy();
    }, 1000 );
  }

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

  public onFieldUpdated(field: keyof UserType, value: string) {
    // update user signal's field by mutations
    this.userSignal.update((current) => {
      switch(field) {
        case 'id':
          current.id = Number(value);
          break;
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
      }

      return current;
    });
  }

  public increaseBy(value: number) {
    this.counter.update((current) => current+value);
  }
}
