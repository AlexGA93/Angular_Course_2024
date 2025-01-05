import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as CustomValidators from '../../../shared/validators/validators.functions';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name:       ['', [Validators.required, Validators.pattern(this.validators.firstNameAndLastnamePattern)]],
    email:      ['', [Validators.required, Validators.pattern(this.validators.emailPattern)], [this.emailValidator]],
    username:   ['', [Validators.required, this.validators.cantBeRegisteredUser]],
    password:   ['', [Validators.required, Validators.minLength(6)]],
    password2:  ['', [Validators.required]]
  },
  {
    validators: [
      this.validators.isFieldOneEqualToFieldTwo( 'password', 'password2' )
    ]
  });

  constructor( 
    private fb: FormBuilder, 
    private validators: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) {}

  public isValidField ( field: string ) {
    // TODO: Obtain validation from service

    return this.validators.isValidField( this.myForm, field );

  }

  public onSubmit() {
    console.log(this.myForm.value);

    this.myForm.markAllAsTouched();
  }
}
