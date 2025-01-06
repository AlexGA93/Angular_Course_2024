import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'products-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{

  public isProductVisible: boolean = false;
  public currentPrice: number = 10;

  // 1- Called before any life cycle
  constructor(){
    console.log('constructor')
  }
  
  

  // 2- Called after class constructor
  // calls it shortly after checking the input properties for that component or directive for the first time.
  ngOnInit(): void {
    console.log('ngOnInit');
  }



  // 3- Called before ngOninit
  // Respond when Angular sets or reset data-bound input properties
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }

  // 4- Called immediately after ngOnChanges
  // Detect and act upon changes that Angular can't or won't detect on its own. 
  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  // 5- Called after the first ngDoCheck
  // Respond after Angular projects external content into the component's view, or into the view that a directive is in. 
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  // 6- Called after ngAfterContentInit() and every subsequent ngDoCheck().
  // Respond after Angular checks the content projected into the directive or component. 
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  // 7- Called once after the first ngAfterContentChecked().
  // Respond after Angular initializes the component's views and child views, or the view that contains the directive. 
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  // 8- Called after the ngAfterViewInit() and every subsequent ngAfterContentChecked().
  // Respond after Angular checks the component's views and child views, or the view that contains the directive.
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }




  // 9- Called immediately before Angular destroys the directive or component.
  // Cleanup just before Angular destroys the directive or component. Unsubscribe Observables and detach event handlers to avoid memory leaks. 
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }


  public increasePrice(): void {
    this.currentPrice++;
  }
}
