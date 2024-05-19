import { Component } from '@angular/core';
import { LoginService } from '../../services/login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private loginService:LoginService ){}
  

}
