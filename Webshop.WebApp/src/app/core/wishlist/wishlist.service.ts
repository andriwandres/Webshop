import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WishlistItem } from 'src/models/wishlist/wishlist-item';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  constructor(private readonly http: HttpClient) { }

  getWishlist(): Observable<WishlistItem[]> {
    const url = `${environment.api.wishlist}/GetWishlist`;

    return this.http.get<WishlistItem[]>(url).pipe(
      retry(2),
    );
  }

  addWishlistItem(productId: number): Observable<WishlistItem> {
    const url = `${environment.api.wishlist}/AddWishlistItem/${productId}`;

    return this.http.post<WishlistItem>(url, null);
  }

  removeWishlistItem(wishlistItemId: number): Observable<number> {
    const url = `${environment.api.wishlist}/RemoveWishlistItem/${wishlistItemId}`;

    return this.http.delete<number>(url);
  }
}
