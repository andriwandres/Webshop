import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReviewModule } from './review/review.module';
import { ReviewsComponent } from './reviews.component';

@NgModule({
  declarations: [ReviewsComponent],
  imports: [
    CommonModule,
    ReviewModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [ReviewsComponent]
})
export class ReviewsModule { }
