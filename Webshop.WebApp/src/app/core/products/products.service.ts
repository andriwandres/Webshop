import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductDetails } from 'src/models/products/productDetails';
import { ProductListing } from 'src/models/products/productListing';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private readonly http: HttpClient) { }

  getProducts(): Observable<ProductListing[]> {
    const url = `${environment.api.product}/GetProducts`;

    return this.http.get<ProductListing[]>(url).pipe(
      retry(2)
    );
  }

  getProductDetails(productId: number): Observable<ProductDetails> {
    const url = `${environment.api.product}/GetProduct/${productId}`;

    return this.http.get<ProductDetails>(url).pipe(
      retry(2)
    );
  }
}
