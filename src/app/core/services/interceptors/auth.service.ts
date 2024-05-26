import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  whitelistEndpoints = environment.endpoints;
  private whitelist = [
    this.whitelistEndpoints.patient.login,
    this.whitelistEndpoints.patient.signup,
    this.whitelistEndpoints.employee.login,
    this.whitelistEndpoints.employee.signup,
    
  ];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isWhitelisted = this.whitelist.some((url) => req.url.includes(url));

    if (isWhitelisted) {
      return next.handle(req);
    }

    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
