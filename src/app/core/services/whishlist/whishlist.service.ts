import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {

  constructor(private httpClient: HttpClient) { }

  addProductToWishList(id:string):Observable<any>{
      return this.httpClient.post(`${environment.baseURL}/api/v1/wishlist`,
        {
           "productId": id
        }
       )
      }

    removeItemFromWishList(id:string):Observable<any>{
        return this.httpClient.delete(`${environment.baseURL}/api/v1/wishlist/${id}`
        )

      }
      getUserWishList():Observable<any>{

        return this.httpClient.get(`${environment.baseURL}/api/v1/wishlist`)
      }
}
