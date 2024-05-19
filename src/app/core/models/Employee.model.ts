export class Employee {
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public street: string,
    public hNr: string,
    public postcode: string,
    public city: string,
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean
  ) {}
}
