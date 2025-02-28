import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { log } from 'node:console';
import { ICart } from '../../shards/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { reduce } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly toastr = inject(ToastrService);
  private readonly cartService = inject(CartService);
  counter: number = 0;

  cartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this.getCartData();
  }
  getCartData(): void {
    this.cartService.getUserLoggedCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeSpeceficItem(id).subscribe({
          next: (res) => {
            this.cartDetails = res.data;
            this.toastr.error('Item Removed');
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });

        Swal.fire({
          title: 'Deleted!',
          text: 'Your Item has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  updateItemQty(id: string, count: number): void {
    this.cartService.updateItemQty(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        console.log(res);
      },
      error: () => {},
    });
  }

  clearCart() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next: (res) => {
            if (res.message == 'success') {
              this.cartDetails = {} as ICart;
              this.toastr.error(res.message);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your Cart has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
