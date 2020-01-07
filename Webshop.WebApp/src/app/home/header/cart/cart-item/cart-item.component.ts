import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CartItem } from 'src/models/cart/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  @Input() item: CartItem;
  @Output() removeItem = new EventEmitter<number>();

  @HostListener('click', ['$event']) onClick(event: Event): void {
    event.stopPropagation();
  }
}
