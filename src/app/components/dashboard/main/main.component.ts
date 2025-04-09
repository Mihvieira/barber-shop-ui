import { Component } from '@angular/core';
import { MinCardComponent } from "../min-card/min-card.component";
import { CalendarCardComponent } from "../calendar-card/calendar-card.component";
import { AgendaViewComponent } from "../agenda-view/agenda-view.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  imports: [
    MinCardComponent,
    CalendarCardComponent,
    AgendaViewComponent,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {

  focusView(elementId: string) {
    const calendarCard = document.querySelector('app-calendar-card');
    const agendaCard = document.querySelector('app-agenda-view');

    if (elementId === "month") {
      if (calendarCard) {
      (calendarCard as HTMLElement).classList.add("show");
      (agendaCard as HTMLElement).classList.remove('show');

      }
    } else{
      if (agendaCard) {
        (agendaCard as HTMLElement).classList.add('show');
        (calendarCard as HTMLElement).classList.remove('show');
      }
    }
  }

}
