import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  public title: string = "Hello World!";
  public counter: number = 0;

  increaseBy( value:number ): void {
    this.counter+=value;
  }

  decreaseBy( value:number ): void {
    this.counter-=value;
  }

  reset(): void {
    this.counter = 0;
  }
}
