import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shards/interfaces/iproduct';
import { log } from 'console';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
private readonly activatedRoute= inject(ActivatedRoute)
private readonly productsService = inject(ProductsService)
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
}
