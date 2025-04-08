
export enum Days{
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}

export class WorkingDays {
  id: number | undefined;
  workingDay: Days | undefined;
  openingHour: Date | undefined;
  clousingHour: Date | undefined;
  startBreakTime: Date | undefined;
  endBreakTime: Date | undefined;
  barberShopId: number | undefined;
}
