import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private readonly url: string = 'ws://localhost:3000';
  private userDeletedSubject = new Subject<void>();

  constructor() {
    this.initiateSocket();
  }

  private initiateSocket(): void {
    if (typeof WebSocket !== 'undefined') {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log('Connected to server');
      };

      this.socket.onclose = () => {
        console.log('Disconnected from server');
      };

      this.socket.onerror = (error) => {
        console.error('Error occurred:', error);
      };

      this.socket.onmessage = (event) => {
        let message;
        try {
          message = JSON.parse(event.data);
        } catch (e) {
          console.error('Error parsing message:', e);
          return;
        }
        console.log('Received message:', message);
        if (message.event === 'userdeleted') {
          console.log('User deleted event received!');
          this.userDeletedSubject.next(); // Notify the subject
        }
      };
    } else {
      console.error('WebSocket is not supported by your browser or server environment');
    }
  }

  public waitForConnection(): Promise<void> {
    return new Promise((resolve) => {
      if (this.socket.readyState === WebSocket.OPEN) {
        console.log('Already connected to server');
        resolve();
      } else {
        this.socket.onopen = () => {
          console.log('Connected to server');
          resolve();
        };
      }
    });
  }

  onuserdeleted(): Observable<void> {
    return this.userDeletedSubject.asObservable();
  }

  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }
}
