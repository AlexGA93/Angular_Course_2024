import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserType } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {
  // service injection
  public userService = inject( UserService );

  // * singals with default values
  // signal
  public userId = signal(1);
  // current user signal
  public currentUser = signal<UserType | undefined>(undefined);
  // boolean signal
  public userWasFound = signal(true);
  // create a computed signal to assign a value if there is no user or the current user
  public fullName = computed<string>(() => {
    // if there is no user return a default message
    if (!this.currentUser()) return 'User not found!';
    // return ( and assign to this signal's value) the current user info
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  });

  ngOnInit(): void {
    // use signal with user id to make the request
    this.loadUser(this.userId());
  }

  loadUser( id: number ) {
    // do nothing if id is smaller than 0
    if(id <= 0 ) return;

    // set signal value to current user id
    this.userId.set(id);
    // set current user signal to undefined (clean)
    this.currentUser.set(undefined);
    // caling service's method
    this.userService.getUserById( id )
    .subscribe({
      // once subscribed... next step
      next: (userInfo) => {
        // assign user information to the signal
        this.currentUser.set(userInfo);
        // update 'was found' signal value
        this.userWasFound.set(true);
      },
      // error case 
      error: () => {
        // clean user info signal
        this.currentUser.set(undefined);
        // asign to false to the signal
        this.userWasFound.set(false);
      }
    })
  }

}
