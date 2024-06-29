import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from '../../../modules/auth/services/login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private loginService: LoginService, private router: Router) {}

  resolve(): Observable<boolean> {
    return this.loginService.isAuthenticated().pipe(
      tap(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/home']);
        }
      })
    );
  }
}
