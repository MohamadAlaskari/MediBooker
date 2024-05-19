export class Appointment {
  constructor(
    public id: number,
    public date: Date,
    public hour: string,
    public description: string,
    public status: boolean
  ) {}
}
