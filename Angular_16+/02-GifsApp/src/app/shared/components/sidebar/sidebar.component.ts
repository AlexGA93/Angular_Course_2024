import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor( private _gifService: GifsService ) {}

  get tags() {
    return this._gifService.tagHistory;
  }

  public searchTag(tag: string) {
    this._gifService.searchTag( tag );
  }
}
