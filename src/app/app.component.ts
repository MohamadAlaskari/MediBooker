import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from './core/services/WebSocket/web-socketservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'MediBooker';
  private userdeletedsubj!: Subscription;

  constructor(private webSocketService: WebSocketService) {}


}
