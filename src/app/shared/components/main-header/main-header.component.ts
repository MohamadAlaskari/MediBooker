import { Component } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth-service/auth.service';
import { Patient } from '../../../core/models/Patient.model';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../modules/auth/services/login-service/login.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent {
  title = 'MediBooker';
  currentPatient: Patient | null = null;

  darkMode: boolean = false;
  islogedin: boolean = false;
  subscribtion = new Subscription();

  constructor(
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.islogedin = this.authService.isAuthenticated();
    this.loadPatient();
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe;
  }

  logout(): void {
    this.subscribtion.add(
      this.authService.logout().subscribe({
        next: (response) => {
          console.log('logout successfully');
          this.islogedin = false;
          window.location.reload();
        },
        error: (error) => {
          console.log('an error occurred while logout', error);
        },
      })
    );
  }
  private loadPatient() {
    this.subscribtion.add(
      this.loginService.getPatientByToken().subscribe({
        next: (patient: Patient) => {
          this.currentPatient = patient;
        },
        error: (error) => {
          console.error('an error ocure while fetching Patient: ', error);
        },
      })
    );
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
}
