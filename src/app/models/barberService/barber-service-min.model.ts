export class BarberServiceMin {

  constructor(id?: number, name?: string, duration?: string) {
    this.id = id;
    this.name = name;
    this.duration = duration;
  }

  id: number | undefined;
  name: string | undefined;
  duration: string | undefined;
}
