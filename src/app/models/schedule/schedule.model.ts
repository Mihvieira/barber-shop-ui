import { BarberServiceMin } from "../barberService/barber-service-min.model";
import { ClientMin } from "../client/client-min.model";

export enum ScheduleStatus {
  SCHEDULED = 'SCHEDULED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export class Schedule {
  id: number | undefined;
  client: ClientMin | undefined;
  barberService: BarberServiceMin | undefined;
  date: Date | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  status: ScheduleStatus | undefined;
}
