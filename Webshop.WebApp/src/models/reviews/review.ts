
export interface Review {
  reviewId: number;
  userId: number;
  authorName: string;
  body: string;
  stars: number;
  createdAt: Date;
}
