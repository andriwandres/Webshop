import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WishlistItemComponent } from './wishlist-item.component';

@NgModule({
  declarations: [WishlistItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [WishlistItemComponent]
})
export class WishlistItemModule { }
