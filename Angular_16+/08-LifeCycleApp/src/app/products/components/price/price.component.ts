import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public price: number = 0;

  public interval$?: Subscription;

  constructor() {
    console.log('price constructor');
  }
  
  ngOnInit(): void {
    console.log("price's ngOnInit");

    // will cause that father's events will activate
    /**
     * 
     * counter
      ngDoCheck product.component.ts:37:12
      ngAfterContentChecked product.component.ts:49:12
      ngAfterViewChecked
     */
    this.interval$ = interval(1000).subscribe( (value) => console.log(value) )
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("price's ngOnChanges");
    console.log({ changes });
  }
  ngOnDestroy(): void {
    console.log("price's ngOnDestroy");
    // clean interval subscription
    console.log("interval subscription aborted");
    this.interval$?.unsubscribe();
  }
}
