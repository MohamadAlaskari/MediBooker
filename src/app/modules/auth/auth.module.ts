import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth-service/auth.service';

@NgModule({
  declarations: [LoginComponent, SignupComponent, AuthComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule],
  providers: [],
  exports: [AuthComponent],
})
export class AuthModule {}
