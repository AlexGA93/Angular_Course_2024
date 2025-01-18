import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  // variable to store and control html element
  // could be null or an html element
  private htmlElement?: ElementRef<HTMLElement>;

  private _color: string = 'red';

  private _errors?: ValidationErrors | null;

  // input color from html element
  @Input()
  set color( value: string ) {
    // take color from html element and assign to internal variable
    this._color = value;
    // with every color change we call function to change style
    this.setStyle();
  }

  // input to deal with reactive form errors
  @Input()
  set errors( value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessages();
  }

  // injection of the HTML element
  constructor( private element: ElementRef<HTMLElement> ) {
    // console.log("Directive - Constructor");
    // console.log(element);
    this.htmlElement = element;
  }

  ngOnInit(): void {
    // console.log("Directive - OnInit");
  }

  private setStyle(): void {
    // ifthere is no html element do nothing
    if (!this.htmlElement) return;

    // set style to html element
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  private setErrorMessages(): void {
    // ifthere is no html element do nothing
    if (!this.htmlElement) return;
    // if there is not errors return no errors message
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = "There is no errors";
      return;
    }

    const errors = Object.keys(this._errors);
    console.log(errors);

    // required error
    if(errors.includes('required')){
      this.changeNativeText('This field is required.');
      return;
    } 

    // minLength error
    if(errors.includes('minlength')) {
      const { requiredLength, actualLength } = this._errors!['minlength'];
      
      this.changeNativeText(`Actual Length: ${actualLength} / ${requiredLength} characters`);
      return;
    }

    // email error
    if(errors.includes('email')) {
      this.changeNativeText('The field has not email format');
      return;
    }
  }

  private changeNativeText( text: string ) {
    this.htmlElement!.nativeElement.innerText = text;
  }

}
