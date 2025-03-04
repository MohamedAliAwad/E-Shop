import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit   {


private readonly authservice = inject(AuthService);
private readonly cartService = inject(CartService)
isLogin= input<boolean>(true);
countCart!:number



ngOnInit(): void {
  this.cartService.cartNumber.subscribe({
    next: (value) => {
      this.countCart = value;
    },
  });

this.cartService.getUserLoggedCart().subscribe({
  next:(res)=>{
    this.cartService.cartNumber.next(res.numOfCartItems)
  }
})

  console.log(this.countCart)
}
logout() {
  this.authservice.removeUserDate();

}
}
