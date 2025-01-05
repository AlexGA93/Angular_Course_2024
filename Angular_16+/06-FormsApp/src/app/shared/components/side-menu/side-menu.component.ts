import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu.interface';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {
  public reactiveMenu: MenuItem[] = [
    { title: 'basics'   , route: './reactive/basic'   },
    { title: 'dynamics' , route: './reactive/dynamic' },
    { title: 'switches' , route: './reactive/switches'},
  ];

  public authMenu: MenuItem[] = [
    { title: 'registration', route: './auth' }
  ];
}
