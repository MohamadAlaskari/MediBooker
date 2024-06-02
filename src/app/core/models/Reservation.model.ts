import { Appointment } from './Appointment.model';
import { Patient } from './Patient.model';
import { Service } from './Service.model';

export class Reservation {
  constructor(
    public id: string,
    public appointmentId: string,
    public patientId: string,
    public serviceId: string,
    public Appointment?: Appointment,
    public patient?: Patient,
    public Service?: Service
  ) {}
}
