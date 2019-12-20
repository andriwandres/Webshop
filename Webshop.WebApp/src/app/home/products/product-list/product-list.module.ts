import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductModule } from '../product/product.module';
import { ProductListComponent } from './product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductModule,
  ],
  exports: [ProductListComponent]
})
export class ProductListModule { }
