import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { trigger, style, animate, transition, group } from '@angular/animations';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        group([
          style({ opacity: 0 }), // Initial state: transparent
          animate('400ms ease-out', style({ opacity: 1 })) // Fade in smoothly
        ])
      ]),
      transition(':leave', [
        group([
          animate('400ms ease-in', style({ opacity: 0 })) // Fade out smoothly
        ])
      ])
    ])
  ]
})

export class AuthComponent {


}
