import { Component } from '@angular/core';

@Component({
  selector: 'products-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent {
  public nameUpper: string = "JHON";
  public nameLower: string = "john";
  public fullName: string = "jOhN dOe";

  public customDate: Date = new Date();
}
