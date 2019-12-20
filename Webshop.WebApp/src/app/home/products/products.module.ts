import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterModule } from './filter/filter.module';
import { ProductModule } from './product/product.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    FilterModule,
    ProductModule,
    ProductsRoutingModule,
  ]
})
export class ProductsModule { }
