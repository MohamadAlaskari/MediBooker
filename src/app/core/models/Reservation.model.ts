import { Appointment } from './Appointment.model';
import { Patient } from './Patient.model';
import { Service } from './Service.model';

export class Reservation {
  constructor(
    public id: number,
    public appointmentId: number,
    public patientId: number,
    public serviceId: number,
    public appointment?: Appointment,
    public patient?: Patient,
    public service?: Service
  ) {}
}
