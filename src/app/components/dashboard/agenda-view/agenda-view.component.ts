import { Component } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-agenda-view',
  imports: [],
  templateUrl: './agenda-view.component.html',
  styleUrl: './agenda-view.component.scss'
})
export class AgendaViewComponent {
  hours: number[] = [];

  constructor(){
    const start = 0;
    const end = 23;

    this.hours = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  }

}
