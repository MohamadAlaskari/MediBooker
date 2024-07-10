import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private readonly url: string = 'ws://localhost:3000';


  private employeesubject = new Subject<void>();
  private patientsubject = new Subject<void>();
  private servicesubject = new Subject<void>();
  private appointmentsubject = new Subject<void>();
  private newreservationsubj = new Subject<string>();

  constructor() {

  }

  public initiateSocket(): void {
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
        this.handleWebSocketMessage(event);
      };
    } else {
      console.error('WebSocket is not supported by your browser or server environment');
    }
  }
  private handleWebSocketMessage(event: MessageEvent): void {
    const message = event.data;

    console.log('Received message:', message);

    if (message === 'employeearrayupdate') {
      this.employeesubject.next();
    }
    if (message === 'patientarrayupdate') {
      this.patientsubject.next();
    }
    if (message === 'servicesarrayupdate') {
      this.servicesubject.next();
    }
    if (message === 'appointmentsarrayupdate') {
      this.appointmentsubject.next();
    }
    if (message.startsWith('newreservation:')) {
      console.log("New reservation notification received from server:", message);
      const reservationDetails = message.substring('newreservation:'.length).trim();
      this.newreservationsubj.next(reservationDetails);
    }
  }


  public onemployeeupdate(): Observable<void> {
    return this.employeesubject.asObservable();
  }

  public onpatientupdate(): Observable<void> {
    return this.patientsubject.asObservable();
  }

  public onserviceupdate(): Observable<void> {
    return this.servicesubject.asObservable();
  }

  public onappointmentupdate(): Observable<void> {
    return this.appointmentsubject.asObservable();
  }

  public onNewReservation(): Observable<string> {
    return this.newreservationsubj.asObservable();
  }

  public sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }
}
