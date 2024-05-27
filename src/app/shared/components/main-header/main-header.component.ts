import { Component } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth-service/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent {
  title = 'MediBooker';
  currentUser: string = 'Mohamad Alaskari';
  darkMode: boolean = false;
  islogedin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.islogedin = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('logout successfully');
        this.islogedin = false;
      },
      error: (error) => {
        console.log('an error occurred while logout', error);
      },
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
}
