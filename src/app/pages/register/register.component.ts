import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly toastr=inject(ToastrService)
 private readonly authService=inject(AuthService);
 private readonly router = inject(Router);
 loading: boolean = false;
 isSucess: string = '';
 errorMessage: string = '';
 @ViewChild('alertDiv') alert22!:ElementRef;
register: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
}, { validators: this.customValidation });


submitForm(): void {
  if(this.register.valid){
    this.loading = true;
    this.authService.sendRegisterForm(this.register.value).subscribe({
      next: (response) => {
       if(response.message=='success'){

        setTimeout(() => {
          this.router.navigate(['/login']);
          this.toastr.success(response.message)
        }, 500);

        this.isSucess = response.message;

       }
       this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
        this.errorMessage = error.error.message;
        this.toastr.error(error.error.message)
      }
    });
}else{
  this.register.markAllAsTouched();
}
}

customValidation(group: AbstractControl) {
const password = group.get('password')?.value;
const rePassword = group.get('rePassword')?.value;
return password === rePassword ? null : { mismatch: true };
}

}


