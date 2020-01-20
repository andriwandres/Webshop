import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/models/cart/cart-item';

@Component({
  selector: 'app-checkout-cart-item',
  templateUrl: './checkout-cart-item.component.html',
  styleUrls: ['./checkout-cart-item.component.scss']
})
export class CheckoutCartItemComponent {
  @Input() cartItem: CartItem;
  @Output() removeItem = new EventEmitter<void>();
}
