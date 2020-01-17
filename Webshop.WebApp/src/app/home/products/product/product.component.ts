import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductListing } from 'src/models/products/productListing';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  @Input() product: ProductListing;

  get imageBase64(): string {
    return `data:image/webp;base64, ${this.product.image}`;
  }
}
