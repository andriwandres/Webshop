import { Component, EventEmitter, HostListener, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { WishlistItem } from 'src/models/wishlist/wishlist-item';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistItemComponent {
  @Input() item: WishlistItem;
  @Output() removeItem = new EventEmitter<number>();

  @HostListener('click', ['$event']) onClick(event: Event): void {
    event.stopPropagation();
  }
}
