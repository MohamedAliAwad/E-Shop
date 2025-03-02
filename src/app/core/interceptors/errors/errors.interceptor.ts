import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
    let toastr = inject(ToastrService);

  return next(req).pipe(catchError((err)=>{
    console.log(err.error.message)
    toastr.error(err.error.message, "E-Shop")
      return throwError(()=>{err});
  })  );
};
