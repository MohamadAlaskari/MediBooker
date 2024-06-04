import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isLogin: boolean = true;
  constructor() {}

  switchToSignUp() {
    this.isLogin = false;
    console.log('switch to sign up ', this.isLogin);
  }

  switchToLogin() {
    this.isLogin = true;
  }
}
