import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutCartItemComponent } from './checkout-cart-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [CheckoutCartItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [CheckoutCartItemComponent]
})
export class CheckoutCartItemModule { }
