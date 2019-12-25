import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductDetails } from 'src/models/products/productDetails';
import { ProductListing } from 'src/models/products/productListing';
import { ProductQuery, SortCriteria } from 'src/models/products/productQuery';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private readonly http: HttpClient) { }

  getProducts({ filter, sortCriteria }: ProductQuery): Observable<ProductListing[]> {
    const url = `${environment.api.product}/GetProducts`;
    const options = {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortCriteria', sortCriteria.toString())
    };

    return this.http.get<ProductListing[]>(url, options).pipe(
      retry(2)
    );
  }

  getProductDetails(productId: number): Observable<ProductDetails> {
    const url = `${environment.api.product}/GetProductDetails/${productId}`;

    return this.http.get<ProductDetails>(url).pipe(
      retry(2)
    );
  }
}
