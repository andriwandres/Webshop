import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  @Input() product: any;
  @Output() removeItem = new EventEmitter<void>();

  @HostListener('click', ['$event']) onClick(event: Event): void {
    event.stopPropagation();
  }
}
