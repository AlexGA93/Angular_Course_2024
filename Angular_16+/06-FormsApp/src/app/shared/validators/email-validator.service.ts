import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  validate(control: AbstractControl): Observable<ValidationErrors | null>{
    const email = control.value;

    // return of({ emailTaken: { message: "Email is taken" } })
    // // delay to check form status
    // // ! quit for production
    // .pipe( delay( 2000 ) )


    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {
      console.log({ email });

      if(email === 'johndoe@mail.com') {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
      }else{
        subscriber.next(null);
        subscriber.complete();
      }
    })
    .pipe( delay( 3000 ) )

    return httpCallObservable;
  }
}
