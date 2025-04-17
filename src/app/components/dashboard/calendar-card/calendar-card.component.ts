import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { Schedule } from '../../../models/schedule/schedule.model';
import { DateSyncService } from '../../../service/DateSyncService.service';

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
  selected: Date = new Date();
  schedules: Schedule[] = [];

  constructor(private dateSyncService: DateSyncService) {}

  ngOnInit(): void {
    this.dateSyncService.updateDate(this.selected);
  }
}
