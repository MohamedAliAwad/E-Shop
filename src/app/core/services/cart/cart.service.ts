import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private  httpClient : HttpClient) { }

  token:any = localStorage.getItem('token');


  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}/api/v1/cart`,
      {
         "productId": id
      }
     )
    }

    getUserLoggedCart():Observable<any>
    {
      return this.httpClient.get(`${environment.baseURL}/api/v1/cart`
      )
    }

    removeSpeceficItem(id:string):Observable<any>{
      return this.httpClient.delete(`${environment.baseURL}/api/v1/cart/${id}`
      )

    }

    updateItemQty(id:string, newCount:number):Observable<any>{
      console.log(newCount);

      return this.httpClient.put(`${environment.baseURL}/api/v1/cart/${id}`,
        {
          "count": newCount
        }

      )
    }

    clearCart():Observable<any>{
      return this.httpClient.delete(`${environment.baseURL}/api/v1/cart`

      )
    }
  }
