import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label:"List"    , icon:"label"  , url:"./list"      },
    { label:"Add"     , icon:"add"    , url:"./new-hero"  },
    { label:"Search"  , icon:"search" , url:"./search"    },
  ];
  
  constructor(
    private as: AuthService,
    private rt: Router
  ) {}

  get user(): User | undefined {
    return this.as.currentUser;
  }

  public onLogout() {
    this.as.logout();
    this.rt.navigate(['/auth/login']);
  }
}
