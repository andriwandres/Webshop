import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReviewCreateComponent } from './review-create/review-create.component';
import { ReviewCreateModule } from './review-create/review-create.module';
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
    MatDialogModule,
    ReviewCreateModule
  ],
  exports: [ReviewsComponent],
  entryComponents: [ReviewCreateComponent],
})
export class ReviewsModule { }
