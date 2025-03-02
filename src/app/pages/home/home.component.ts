import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shards/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shards/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { SearchPipePipe } from '../../shards/pipes/search/search-pipe.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, CurrencyPipe, SearchPipePipe,FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  search: string = '';
[x: string]: any;

private readonly productsService = inject(ProductsService);
private readonly categoriesService = inject(CategoriesService);
private readonly cartService = inject(CartService);
private readonly toastr=inject(ToastrService);


products:IProduct[] = [];
categories:ICategory[] = [];

customMainSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay: true,
  rtl: true,
  autoplayTimeout: 3000,
  navSpeed: 700,
  navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
 items: 1,
  nav: false
}
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay: true,
  autoplayTimeout: 3000,
  navSpeed: 700,
  navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}

ngOnInit(): void {
  this.getAllProducts();
  this.getAllCategories();
 }

getAllProducts():void{
  this.productsService.getProducts().subscribe(  {
    next: (response) => {
      console.log(response.data);

      this.products =response.data;
    },
    error: (error) => {
      console.log(error);
    }
  });
}

getAllCategories():void{

  this.categoriesService.getAllCategories().subscribe(  {
    next: (response) => {
      console.log(response.data);
      this.categories =response.data;

    },
    error: (error) => {
      console.log(error);
    }
  });
}

addToCart(id:string){
this.cartService.addProductToCart(id).subscribe(
  {
    next:(res)=>{
      console.log(res);
      this.toastr.toastrConfig.closeButton = true
      this.toastr.toastrConfig.progressBar = true
      this.toastr.success(res.message,'Add product');


    },
    error:(error)=>{console.log(error);
    }
  }
)
console.log(id)
}
}


