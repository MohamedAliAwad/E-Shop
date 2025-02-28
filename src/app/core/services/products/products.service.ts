import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) {

  }
  getProducts():Observable<any>{
    return this.httpClient.get(`${environment.baseURL}/api/v1/products`);
  }

  getSpecficProduct(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseURL}/api/v1/products/${id}`);
  }
}
