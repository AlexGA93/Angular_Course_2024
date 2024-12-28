import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  
  constructor(
    private as: AuthService,
    private rt: Router
  ) {}

  public onLogin() {
    this.as.login('email','password')
    .subscribe( user => {
      this.rt.navigate(['/']);
    });
  }
}
