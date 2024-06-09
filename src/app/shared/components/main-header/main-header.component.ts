import { Component } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth-service/auth.service';
import { Patient } from '../../../core/models/Patient.model';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../modules/auth/services/login-service/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Employee } from '../../../core/models/Employee.model';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent {
  title = 'MediBooker';

  currentPatient: Patient | null = null;
  currentemployee: Employee| null = null;



  darkMode: boolean = false;
  islogedin: boolean = false;
  subscribtion = new Subscription();

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.subscribtion.add(
      this.loginService.isAuthenticated().subscribe((isAuthenticated) => {
        this.islogedin = isAuthenticated;
        if (isAuthenticated) {
          this.loadPatient();
          this.loademployee();
        } else {
          this.currentPatient = null;
        }
      })
    );
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
          this.currentPatient = null;
          this.currentemployee= null;
          this.router.navigate(['/home']).then(() => {
            this.location.replaceState('/home');
            window.location.reload();
          });
        },
        error: (error) => {
          console.log('an error occurred while logout', error);
        },
      })
    );
  }
  logoutemp(): void {
    this.subscribtion.add(
      this.loginService.logoutemp().subscribe({
        next: (response) => {
          console.log('logout successfully');
          this.islogedin = false;
          this.currentPatient = null;
          this.currentemployee= null;
          this.router.navigate(['/home']).then(() => {
            this.location.replaceState('/home');
            window.location.reload();
          });
        },
        error: (error) => {
          console.log('an error occurred while logout', error);
        },
      })
    );
  }
  private loadPatient() {
    if (this.islogedin) {
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
  }
  loademployee() {
    if (this.islogedin) {
      this.subscribtion.add(
        this.loginService.getEmployeeByToken().subscribe({
          next: (employee: Employee) => {
            this.currentemployee = employee;
          },
          error: (error) => {
            console.error('an error ocure while fetching employee: ', error);
          },
        })
      );
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
}
