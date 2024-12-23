import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  /**
   * linked to the html input element with selector as the 
   * local reference named in the html template
   * 
   * with non-null operator (!) asserting that the variable is non-null and access
   */
  @ViewChild('textTagInputLocalReference')
  public tagInput!: ElementRef<HTMLInputElement>;

  // service injection
  constructor( private _gifsService: GifsService ) {}

  searchTag() {
    //  extract value of the viewchild
    const newTag = this.tagInput.nativeElement.value;
    
    this._gifsService.searchTag(newTag);

    // clean value of the input
    this.tagInput.nativeElement.value = "";
  }
}
