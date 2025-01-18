import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {
  // create a signal
  public counter = signal(10);
  // read only computed signal
  public squareCounter = computed( () => this.counter() * this.counter() )

  increaseBy(value: number) {
    // this.counter.set( this.counter() + value );
    this.counter.update( current => current + value );
  }

  decreaseBy(value: number) {
    // this.counter.set( this.counter() - value );
    this.counter.update( current => current - value );
  }
}
