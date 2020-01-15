import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from 'src/models/reviews/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input() review: Review;
  @Input() isOwnReview: boolean;

  @Output() deleteReview = new EventEmitter<void>();
}
