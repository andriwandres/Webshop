import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WishlistComponent } from './wishlist.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [WishlistComponent]
})
export class WishlistModule { }
