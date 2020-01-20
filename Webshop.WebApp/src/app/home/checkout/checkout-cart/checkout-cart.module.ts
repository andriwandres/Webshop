import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutCartComponent } from './checkout-cart.component';
import { CheckoutCartItemModule } from './checkout-cart-item/checkout-cart-item.module';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [CheckoutCartComponent],
  imports: [
    CommonModule,
    CheckoutCartItemModule,
    MatDividerModule
  ],
  exports: [CheckoutCartComponent]
})
export class CheckoutCartModule { }
