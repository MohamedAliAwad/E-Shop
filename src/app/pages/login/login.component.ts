import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr=inject(ToastrService)
  loading: boolean = false;
  isSucess: string = '';
  errorMessage: string = '';
  @ViewChild('alertDev') alert!: ElementRef;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/),
    ]),
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            setTimeout(() => {
              localStorage.setItem('token', response.token);
            //  response.cookie('token', response.token, {
            //     expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            //     httpOnly: true,
            //     secure: true,
            //     sameSite: 'Strict',
            //   });
            this.authService.getUserData();
                this.router.navigate(['/home']);
            }, 500);

            this.isSucess = response.message;
            this.toastr.success(response.message)
          }
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
          this.errorMessage = error.error.message;
          this.toastr.success(error.message)
        },
      });
    }
  }
}
