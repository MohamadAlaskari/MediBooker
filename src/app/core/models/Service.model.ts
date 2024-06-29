export class Service {
  constructor(
    public id: number,
    public type: 'Allergietests' | 'Gesundheitsuntersuchung' | 'Impfungen' | 'Ultraschall' | 'Röntgen' | 'Chiropraktik' | '',
    public description: string
  ) {}
}
