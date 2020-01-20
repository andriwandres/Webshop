import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from 'src/models/order/order';

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private readonly http: HttpClient) { }

  checkout(order: Order): Observable<void> {
    const url = `${environment.api.order}/Checkout`;

    return this.http.post<void>(url, order);
  }
}
