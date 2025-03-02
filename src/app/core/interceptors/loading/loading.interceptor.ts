import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(NgxSpinnerService)
  loading.show('Loading-1')


  return next(req).pipe(finalize(()=>{
    loading.hide('Loading-1')
  }));
};
