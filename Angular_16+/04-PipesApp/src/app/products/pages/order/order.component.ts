import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Color, Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'products-order',
  templateUrl: './order.component.html',
  styles: ``
})
export class OrderComponent {
  public isUpperCase: boolean = false;
  public orderBy?: keyof Hero;
  public avengers: Hero[] = [
    {
      name: 'Ironman',
      canFly: true,
      color: Color.red
    },
    {
      name: 'The Hulk',
      canFly: false,
      color: Color.green
    },
    {
      name: 'Black Panther',
      canFly: true,
      color: Color.black
    },
  ];

  public toggleUpperCase(): void {
    this.isUpperCase = !this.isUpperCase;
  }

  public changeOrder( value: keyof Hero ): void {
    this.orderBy = value;
  }
}
