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
  constructor(private authService: AuthService) {}
  ngOnInit() {}
  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('logout successfully');
      },
      error: (error) => {
        console.log('an error occur while logout', error);
      },
    });
  }

  isAuthenticated() {}
  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
}
