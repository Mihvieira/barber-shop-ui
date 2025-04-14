import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateSyncService {
  private dateSource = new BehaviorSubject<Date>(new Date());
  currentDate$ = this.dateSource.asObservable();

  updateDate(date: Date): void {
    this.dateSource.next(date);
  }
}
