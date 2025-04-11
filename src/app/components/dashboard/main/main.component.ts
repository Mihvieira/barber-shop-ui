import { Component, HostListener, OnInit } from '@angular/core';
import { MinCardComponent } from "../min-card/min-card.component";
import { CalendarCardComponent } from "../calendar-card/calendar-card.component";
import { AgendaViewComponent } from "../agenda-view/agenda-view.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    MinCardComponent,
    CalendarCardComponent,
    AgendaViewComponent,
    MatButtonModule,
    MatMenuModule,
    NgIf,
    RouterModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  currentView: string = 'month';
  isLargeScreen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isLargeScreen = window.innerWidth > 420;
  }

  focusView(view: string): void {
    this.currentView = view;
  }
}
