import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductDetails } from 'src/models/products/productDetails';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDescriptionComponent {
  @Input() product: ProductDetails;

  @Output() addToCart = new EventEmitter<number>();
  @Output() addToWishlist = new EventEmitter<number>();
}
