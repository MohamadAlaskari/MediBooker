import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { LoginService } from '../../../modules/auth/services/login-service/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    // Synchronous check using the BehaviorSubject's value
    if (this.loginService.isAuthenticatedSubject.value) {
      this.router.navigate(['/']);
      return false;
    }

    // Fallback to the observable check if the synchronous check fails
    return this.loginService.isAuthenticated().pipe(
      take(1),
      tap(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/home']);
        }
      }),
      map(isAuthenticated => !isAuthenticated)
    );
  }
}
