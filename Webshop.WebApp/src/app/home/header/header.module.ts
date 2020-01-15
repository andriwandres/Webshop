import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartModule } from './cart/cart.module';
import { HeaderComponent } from './header.component';
import { UserActionsModule } from './user-actions/user-actions.module';
import { WishlistModule } from './wishlist/wishlist.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    CartModule,
    WishlistModule,
    UserActionsModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
