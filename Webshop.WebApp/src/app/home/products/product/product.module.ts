import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductComponent } from './product.component';
import { SafeUrlModule } from '../../safe-url/safe-url.module';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SafeUrlModule,
  ],
  exports: [ProductComponent]
})
export class ProductModule { }
