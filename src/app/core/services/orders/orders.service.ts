import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  token: string | null = localStorage.getItem('token');
  constructor(private hhtpClient:HttpClient) { }

  checkOutPayment(id:string, data:object):Observable<any>{
    return this.hhtpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,{
      "shippingAddress": data
    })
  }
}
