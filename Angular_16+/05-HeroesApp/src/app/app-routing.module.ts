import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  // authentication child routes
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule ),
    canActivate: [ PublicGuard ],
    canMatch: [ PublicGuard ]
  },
  // heroes child routes
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( module => module.HeroesModule ),
    canActivate: [ PublicGuard ],
    canMatch: [ PublicGuard ]
  },
  // simple 404 page
  {
    path: '404',
    component: Error404PageComponent
  },
  // main route '/' (full path match)  redirecting to heroes
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  // any other route
  {
    path: '**',
    redirectTo: '404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
