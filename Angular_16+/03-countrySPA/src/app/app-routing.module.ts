import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes: Routes = [
  // main routes
  // { path: "", component: HomePageComponent },
  { path: "about", component: AboutPageComponent },
  { path: "contact", component: ContactPageComponent },
  // child routes
  { path: "countries", 
    loadChildren: () => import('./countries/countries.module').then( module => module.CountriesModule )
  },
  // default route
  { path: "**", redirectTo: "countries" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
