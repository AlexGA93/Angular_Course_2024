import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  // fucntion that checks if form control is strider
  public cantBeRegisteredUser = (
    control: FormControl
  ): ValidationErrors | null => {
    // extract control value to compare
    const value = control.value.trim().toLowerCase();
    console.log(value);
  
    // example of username give by backend
    const usernameFromDatabase = 'John93'.trim().toLowerCase();
  
    if (value === usernameFromDatabase) {
      return { noUser: true };
    }
  
    return null;
  };
  
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }
  
  public isFieldOneEqualToFieldTwo( field1: string, field2: string ) {
    return ( formGroup: FormGroup ): ValidationErrors | null => {

      // extract form field
      const fieldValue1 = formGroup.get( field1 )?.value;
      const fieldValue2 = formGroup.get( field2 )?.value;

      console.log(fieldValue1+" | "+fieldValue2);
      

      // checking the two of the fields
      if (fieldValue1 !== fieldValue2) {

        // set errors to the second field
        formGroup.get(field2)?.setErrors({ notEqual: true });

        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
}
