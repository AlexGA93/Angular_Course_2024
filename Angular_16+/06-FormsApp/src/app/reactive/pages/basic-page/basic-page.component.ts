import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{
  // reactive form definition using FormGroup
  // public myForm: FormGroup = new FormGroup({
  //   name:       new FormControl(''),
  //   price:      new FormControl(0),
  //   inStorage:  new FormControl(0),
  // });

  // using formBuilder
  // 1- injecting into constructor
  constructor(private formBuilder: FormBuilder) {}

  // 3- apply on init a default value
  ngOnInit(): void {
    const backendExample = {
      name: "backend product",
      price: 99.98,
      inStorage: 3
    };
    this.myForm.reset( backendExample );
  }

  // 2- definition
  public myForm: FormGroup = this.formBuilder.group({
    // field: [<default_data>, <sync_validations>, <async_validations>]
    name:       ['' , [Validators.required, Validators.minLength(3)]],
    price:      [0  , [Validators.required, Validators.min(0)]],
    inStorage:  [0  , [Validators.required, Validators.min(0)]]
  });

  // 4- function that returns a boolean value from the validations
  public isValidField( field: string ): boolean {
    const isValidated = 
      // check if form's field is required
      this.myForm.controls[field].errors!! && // and...
      // check if form's field is touched
      this.myForm.controls[field].touched;
    return isValidated;
  }

  // 4- function that returns the error message
  public getFieldError( field: string ): string | null {
    // if we don't have any field, exit
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      console.log(key);
      
      // select error message
      switch(key) {
        case 'required':
          return `${field} is required.`;
        case 'minlength':
          return `${field} must be ${errors['minlength'].requiredLength} characters long`;
        case 'min':
          return `${field} must be 0 or greater `;
      }
    }

    return null;
  }

  public onSave(): void {

    if(!this.myForm.valid){
      // mark form as touched to init validations
      this.myForm.markAsTouched();
      return;
    }

    console.log(this.myForm.value);

    // reset form values and state
    this.myForm.reset();
  }
}
