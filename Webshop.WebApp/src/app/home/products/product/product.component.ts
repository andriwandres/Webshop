import { Component, OnInit, Input } from '@angular/core';
import { ProductListing } from 'src/models/products/productListing';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: ProductListing;

  constructor() { }

  ngOnInit() {
    this.product.averageStars = 4;
    this.product.reviewsCount = 151;
  }
}
