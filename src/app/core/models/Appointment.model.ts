export class Appointment {
  constructor(
    public id: number,
    public date: Date,
    public hour: string,
    public status: boolean
  ) {}
}
