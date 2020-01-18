import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutCartComponent } from './checkout-cart.component';



@NgModule({
  declarations: [CheckoutCartComponent],
  imports: [
    CommonModule
  ],
  exports: [CheckoutCartComponent]
})
export class CheckoutCartModule { }
