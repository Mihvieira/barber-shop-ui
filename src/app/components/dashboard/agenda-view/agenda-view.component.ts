import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarberShopApiService } from '../../../service/barber-shop-api.service';
import { Schedule, ScheduleMin } from '../../../models/schedule/schedule.model';
import { DateSyncService } from '../../../service/DateSyncService.service';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-agenda-view',
  imports: [],
  providers: [
      provideNativeDateAdapter(),
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    ],
  templateUrl: './agenda-view.component.html',
  styleUrl: './agenda-view.component.scss',
})
export class AgendaViewComponent implements OnInit {
  hours: number[] = [];
  dateTimeNow!: number;
  private intervalId: any;
  schedules: ScheduleMin[] = [];

  @ViewChild('timeNow') timeNow!: ElementRef;

  constructor(
    private service: BarberShopApiService,
    private dateSyncService: DateSyncService
  ) {
    const start = 0;
    const end = 23;
    this.hours = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.dateTimeNow = Date.now();
      this.scrollToCurrentHour();
    }, 60000);

    this.dateSyncService.currentDate$.subscribe((date) => {
      this.dateTimeNow = date.getTime();
      this.getScheduleByDate();
    });
  }

  ngAfterViewInit(): void {
    this.scrollToCurrentHour();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  isCurrentHour(hour: number) {
    const currentHour = new Date(this.dateTimeNow).getHours();
    return hour === currentHour;
  }

  scrollToCurrentHour(): void {
    if (this.timeNow) {
      this.timeNow.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } //TODO: está funcionando só quando a tela abre no pc, versão mobile não funciona porque a tela abre no calendário
  }

  getScheduleByDate(): void {
    if (!this.dateTimeNow || isNaN(this.dateTimeNow)) {
      console.error('Invalid dateTimeNow value:', this.dateTimeNow);
      return; // Evita continuar se a data for inválida
    }

    const currentDate = new Date(this.dateTimeNow);
    if (isNaN(currentDate.getTime())) {
      console.error(
        'Invalid Date object created from dateTimeNow:',
        currentDate
      );
      return; // Evita continuar se a data for inválida
    }

    const isoDate = currentDate.toISOString();
    this.service
      .getSchedulesBetweenDates(isoDate, isoDate)
      .subscribe((schedulesList: ScheduleMin[]) => {
        this.schedules = schedulesList
    });
  }
}
