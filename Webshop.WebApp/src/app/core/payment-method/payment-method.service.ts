import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from 'src/models/payment-methods/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private readonly http: HttpClient) { }

  getPaymentMethods(): Observable<PaymentMethod[]> {
    const url = `${environment.api.paymentMethod}/GetPaymentMethods`;

    return this.http.get<PaymentMethod[]>(url).pipe(
      retry(2)
    );
  }
}
