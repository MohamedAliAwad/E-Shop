import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { log } from 'node:console';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cartID!:string;
  private readonly activateRoute = inject(ActivatedRoute)
  private readonly ordersService = inject(OrdersService)
checkoutForm!:FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  initForm():void{
    this.checkoutForm = new FormGroup({
      details: new FormControl(null,[Validators.required]),
      phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
      city: new FormControl(null,[Validators.required])
    })
  }

  getCartId():void{
     this.activateRoute.paramMap.subscribe({
      next:(res)=>{console.log(res.get('id'));
        this.cartID = res.get('id') || '';
      },
      error: (e)=>{}
    })
  }


  submitForm():void{
    this.ordersService.checkOutPayment(this.cartID,this.checkoutForm.value).subscribe({
      next:(res)=>{
        if(res.status === 'success'){
          open(res.session.url)
        }else{
          console.log('err')
        }

      },
      error: (err)=>{

      }

    })


  }
}
