import { HttpInterceptorFn } from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
