import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CartItem } from 'src/models/cart/cart-item';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private readonly http: HttpClient) { }

  getCart(): Observable<CartItem[]> {
    const url = `${environment.api.cart}/GetCart`;

    return this.http.get<CartItem[]>(url).pipe(
      retry(2),
    );
  }

  addCartItem(productId: number): Observable<CartItem> {
    const url = `${environment.api.cart}/AddCartItem/${productId}`;

    return this.http.post<CartItem>(url, null);
  }

  removeCartItem(cartItemId: number): Observable<number> {
    const url = `${environment.api.cart}/RemoveCartItem/${cartItemId}`;

    return this.http.delete<number>(url);
  }
}
