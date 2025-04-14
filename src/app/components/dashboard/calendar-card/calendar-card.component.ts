import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  model,
  OnInit,
  Output
} from '@angular/core';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { Schedule } from '../../../models/schedule/schedule.model';

@Component({
  selector: 'app-calendar-card',
  templateUrl: './calendar-card.component.html',
  styleUrl: './calendar-card.component.scss',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarCardComponent implements OnInit {
  selected = model<Date>;
  @Output() dateSelected = new EventEmitter<Date>();
  schedules: Schedule[] = [];

  constructor() {}

  ngOnInit(): void {
    this.emitSelectedDate();
  }

  emitSelectedDate(): void {
    if (this.selected) {
      this.dateSelected.emit(this.selected.prototype);
    }
  }

  //"yyyy-MM-dd HH:mm:ss"
}
