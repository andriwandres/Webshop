import { Component, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu;

  cartItems = [
    {
      title: 'Product 1',
      price: 299.00
    },
    {
      title: 'Product 2',
      price: 199.95
    }
  ];

  onRemoveItem(item: any): void {
    console.log('remove', item);
  }
}
