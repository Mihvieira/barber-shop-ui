import { Component } from '@angular/core';
import { MenuHeaderComponent } from "../../menu-header/menu-header.component";
import { MinCardComponent } from "../min-card/min-card.component";
import { CalendarCardComponent } from "../calendar-card/calendar-card.component";
import { AgendaViewComponent } from "../agenda-view/agenda-view.component";

@Component({
  selector: 'app-main',
  imports: [MenuHeaderComponent, MinCardComponent, CalendarCardComponent, AgendaViewComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
