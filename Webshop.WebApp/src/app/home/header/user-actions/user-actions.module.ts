import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserActionsComponent } from './user-actions.component';

@NgModule({
  declarations: [UserActionsComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [UserActionsComponent],
})
export class UserActionsModule { }
