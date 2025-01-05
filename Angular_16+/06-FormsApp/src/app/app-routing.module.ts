import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // '/reactive'
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.module').then( module => module.ReactiveModule )
  },
  // '/auth'
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule )
  },
  // default redirection
  {
    path: '**',
    redirectTo: 'reactive'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
