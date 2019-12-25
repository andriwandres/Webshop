import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDescriptionComponent } from './product-description.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductDescriptionComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [ProductDescriptionComponent],
})
export class ProductDescriptionModule { }
