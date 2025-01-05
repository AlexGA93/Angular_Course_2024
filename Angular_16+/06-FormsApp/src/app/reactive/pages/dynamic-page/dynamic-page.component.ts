import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent implements OnInit {

  public myDynamicForm: FormGroup = this.formBuilder.group({
    // field: [<default_data>, <sync_validations>, <async_validations>]
    name: ['', [Validators.required, Validators.minLength(3)]],
    // array
    favoriteGames: this.formBuilder.array([
      // [<default_data>, <sync_validations>, <async_validations>]
      ['Metal Gear Solid', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  // form control element to add to the array
  public newFavorite: FormControl = new FormControl('', Validators.required); 

  constructor( private formBuilder: FormBuilder ) {}

  ngOnInit(): void {
    
  }

  // getter for favoriteGames
  get favoriteGames() {
    return this.myDynamicForm.get('favoriteGames') as FormArray;
  }

  // * validations
  // function that returns a boolean value from the validations
  public isValidField( field: string ): boolean {
    const isValidated = 
      // check if form's field is required
      this.myDynamicForm.controls[field].errors!! && // and...
      // check if form's field is touched
      this.myDynamicForm.controls[field].touched;
    return isValidated;
  }

  // function that returns the error message
  public getFieldError( field: string ): string | null {
    // if we don't have any field, exit
    if (!this.myDynamicForm.controls[field]) return null;

    const errors = this.myDynamicForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
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

  public isValidFieldInArray( formArray: FormArray, index: number ) {
    const isValidated = 
      // check if form's element is required
      formArray.controls[index].errors!! && // and...
      // check if form's element is touched
      formArray.controls[index].touched;
    return isValidated;
  }

  public onAddToFavorite(): void {
    if (this.newFavorite.invalid) return;

    const newElement: string = this.newFavorite.value;

    // this.favoriteGames.push(new FormControl( newElement, Validators.required));

    this.favoriteGames.push( 
      this.formBuilder.control(
        newElement, 
        Validators.required) 
    );

    this.newFavorite.reset();
  }

  public onDeleteFavorite( index: number ): void {
    // remove element at the array's index
    this.favoriteGames.removeAt( index );
  }

  public onSubmit(): void {
    // check if form is invalid
    if (this.myDynamicForm.invalid) {
      // mark entire form as touched
      this.myDynamicForm.markAllAsTouched();
      return;
    }
    
    (this.myDynamicForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);

    console.log(this.myDynamicForm.value);
    
    // reset form value
    // const resetValues = {name: "Reset Name", favoriteGames: ["Reset Array Item", "Reset Array Item 2"]};
    // this.myDynamicForm.reset(resetValues);
    this.myDynamicForm.reset();
  }
}
