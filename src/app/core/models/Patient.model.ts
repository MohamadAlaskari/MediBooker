export class Patient {
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public dob: Date,
    public email: string,
    public password: string,
    public phoneNr: string,
    public healthInsurance: string,
    public insuranceNr: string,
    public insuranceType: 'private' | 'gesetzlich',
    public street: string,
    public hNr: string,
    public postcode: string,
    public city: string,
    public active: boolean
  ) {}
}
