import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shards/interfaces/iproduct';
import { log } from 'console';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
private readonly activatedRoute= inject(ActivatedRoute)
private readonly productsService = inject(ProductsService)
private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
productID:string = '';
productDetails:IProduct={} as IProduct

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe({
      next: (res)=>{
        this.productID = res.get('id')!;
        console.log(this.productID);
        this.productsService.getSpecficProduct(this.productID).subscribe({
          next:(response)=>{
            this.productDetails = response.data;

          },
          error:(err)=>{}
        })

      },
      error: (error)=>{

      }
    }
  )
}

addToCart(id: string) {
  this.cartService.addProductToCart(id).subscribe({
    next: (res) => {
      console.log(res);
      this.toastr.toastrConfig.closeButton = true;
      this.toastr.toastrConfig.progressBar = true;
      this.toastr.success(res.message, 'Add product');
      this.cartService.cartNumber.next(res.numOfCartItems);
      console.log(this.cartService.cartNumber);

    },
    error: (error) => {
      console.log(error);
    },
  });
  console.log(id);
}
}
