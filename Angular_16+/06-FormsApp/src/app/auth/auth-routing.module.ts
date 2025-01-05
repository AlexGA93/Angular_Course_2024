import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

// child '/auth' routes
const routes: Routes = [{
  path: '',
  children: [
    // '/auth/register'
    { path: 'register', component: RegisterPageComponent },
    // default child redirection
    { path: '**', redirectTo: 'register' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
