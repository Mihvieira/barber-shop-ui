import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-agenda-view',
  imports: [],
  templateUrl: './agenda-view.component.html',
  styleUrl: './agenda-view.component.scss',
})
export class AgendaViewComponent implements OnInit {
  hours: number[] = [];
  dateTimeNow: number = Date.now();
  private intervalId: any;

  @ViewChild('timeNow') timeNow!: ElementRef;

  constructor() {
    const start = 0;
    const end = 23;
    this.hours = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.dateTimeNow = Date.now();
      this.scrollToCurrentHour();
    }, 60000);
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
}
