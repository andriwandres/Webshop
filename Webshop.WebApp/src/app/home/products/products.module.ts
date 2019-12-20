import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterModule } from './filter/filter.module';
import { ProductListModule } from './product-list/product-list.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    FilterModule,
    ProductListModule,
    ProductsRoutingModule,
  ]
})
export class ProductsModule { }
