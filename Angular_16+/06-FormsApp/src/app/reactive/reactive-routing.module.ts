import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SwitchesPageComponent } from './pages/switches-page/switches-page.component';

// child '/reactive' routes
const routes: Routes = [{
  path: '',
  children: [
    // '/reactive/basic'
    { path: 'basic', component: BasicPageComponent },
    // '/reactive/dynamic'
    { path: 'dynamic', component: DynamicPageComponent },
    // '/reactive/switches'
    { path: 'switches', component: SwitchesPageComponent },
    // default child redirection
    { path: '**', redirectTo: 'basic' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveRoutingModule { }
