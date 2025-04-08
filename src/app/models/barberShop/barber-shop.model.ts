import { WorkingDays } from "../workingDays/working-days.model";

export class BarberShop {
  name: string | undefined;
  address: string | undefined;
  workingDays: Array<WorkingDays> | undefined;
}
