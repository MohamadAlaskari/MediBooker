import { Component } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent {
  title = 'MediBooker';
  currentUser: string = 'Mohamad Alaskari';
  darkMode: boolean = false;
  constructor() {}
  ngOnInit() {}
  logout(): void {}

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
}
