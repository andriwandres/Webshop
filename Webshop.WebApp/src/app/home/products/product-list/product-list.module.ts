import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductModule } from '../product/product.module';
import { ProductListComponent } from './product-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductModule,
    RouterModule,
  ],
  exports: [ProductListComponent]
})
export class ProductListModule { }
