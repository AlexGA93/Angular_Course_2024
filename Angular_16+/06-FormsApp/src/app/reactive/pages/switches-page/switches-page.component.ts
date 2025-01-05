import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  // analog default variable with a portion of the form's values
  public person = {
    gender: 'F',
    wantNotifications: false
  };

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
    // assign to the form
    this.myForm.reset( this.person );
  }

  public onSave(): void {
    console.log(this.myForm.value);
    
    // check if form is invalid
    if(this.myForm.invalid) {
      // if my form is marked as invalid we set it as touched
      this.myForm.markAllAsTouched();
      return;
    }

    // extracting person values and assign it to the variable as 'newPerson'
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
  }

  // * Validations
  // function that returns a boolean value from the validations
  public isValidField( field: string ): boolean | null {
    const isValidated = 
      // check if form's field is required
      this.myForm.controls[field].errors && // and...
      // check if form's field is touched
      this.myForm.controls[field].touched;
    return isValidated;
  }
}
