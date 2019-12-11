import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Review } from 'src/models/reviews/review';
import { ReviewDto } from 'src/models/reviews/review-dto';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  constructor(private readonly http: HttpClient) { }

  getReviews(productId: number): Observable<Review[]> {
    const url = `${environment.api.review}/GetReviews/${productId}`;

    return this.http.get<Review[]>(url).pipe(
      retry(2),
    );
  }

  createReview(productId: number, review: ReviewDto): Observable<Review> {
    const url = `${environment.api.review}/CreateReview/${productId}`;

    return this.http.post<Review>(url, review);
  }

  editReview(reviewId: number, review: ReviewDto): Observable<void> {
    const url = `${environment.api.review}/EditReview/${reviewId}`;

    return this.http.post<void>(url, review);
  }

  deleteReview(reviewId: number): Observable<void> {
    const url = `${environment.api.review}/DeleteReview/${reviewId}`;

    return this.http.delete<void>(url);
  }
}
