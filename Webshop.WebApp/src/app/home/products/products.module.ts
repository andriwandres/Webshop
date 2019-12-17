import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductModule } from './product/product.module';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
