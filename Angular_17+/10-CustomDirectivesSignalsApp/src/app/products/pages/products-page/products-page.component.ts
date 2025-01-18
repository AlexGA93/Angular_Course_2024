import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
  // alternative injection method
  private fb = inject( FormBuilder );
  // same as... 
  // constructor( private fb: FormBuilder ) {}

  // property color
  public color: string = 'green';

  // reactive form
  public myForm: FormGroup = this.fb.group({
    name: [
      
      // default value
      "", 
      // sync validators
      [
        Validators.required, // this input is required to make form value
        Validators.minLength(7), // this input must be 6 characters long
        Validators.email, // this input mut be an email
      ]
    ]
  });

  changeColor() {
    // generate random color
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    

  }

}
