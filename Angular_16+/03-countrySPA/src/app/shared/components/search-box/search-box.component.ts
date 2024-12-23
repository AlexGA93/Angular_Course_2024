import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debounceSuscription?: Subscription;
  
  @Input()
  public inputTitle: string = "";

  @Input()
  public inputPlaceHolder: string = "";

  @Input()
  public initialValue: string = "";

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debounceSuscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.debounceSuscription?.unsubscribe();
  }

  public onKeyPress(searchTerm: string): void {
    this.debouncer.next( searchTerm );
  }
}
