import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { BasicsPageComponent } from './pages/basics-page/basics-page.component';
import { NumbersPageComponent } from './pages/numbers-page/numbers-page.component';
import { UncommonPageComponent } from './pages/uncommon-page/uncommon-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { OrderComponent } from './pages/order/order.component';
import { TooglePipePipe } from './pipes/toogle-pipe.pipe';
import { CanFlyPipePipe } from './pipes/can-fly-pipe.pipe';
import { SortByPipePipe } from './pipes/sort-by-pipe.pipe';
import { ColorByPipePipe } from './pipes/color-by-pipe.pipe';


@NgModule({
  declarations: [
  
    BasicsPageComponent,
    NumbersPageComponent,
    UncommonPageComponent,
    OrderComponent,
    TooglePipePipe,
    CanFlyPipePipe,
    SortByPipePipe,
    ColorByPipePipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PrimeNgModule
  ]
})
export class ProductsModule { }
