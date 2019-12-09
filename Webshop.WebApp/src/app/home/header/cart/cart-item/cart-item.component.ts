import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ProductListing } from 'src/models/products/productListing';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  @Input() product: ProductListing;
  @Output() removeItem = new EventEmitter<number>();

  @HostListener('click', ['$event']) onClick(event: Event): void {
    event.stopPropagation();
  }
}
