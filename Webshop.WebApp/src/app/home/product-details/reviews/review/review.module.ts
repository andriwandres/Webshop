import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [ReviewComponent]
})
export class ReviewModule { }
