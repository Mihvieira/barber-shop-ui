import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  Schedule,
  ScheduleStatus,
  ScheduleToCreate,
} from '../../models/schedule/schedule.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BarberShopApiService } from '../../service/barber-shop-api.service';
import { BarberServiceMin } from '../../models/barberService/barber-service-min.model';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrl: './schedule-view.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ScheduleViewComponent implements OnInit {
  value!: Date;
  status!: ScheduleStatus[];
  clientId!: number;
  barberServiceId! : number;
  stat!: string;
  barberServices: BarberServiceMin[] = [];
  schedule!: Schedule;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BarberShopApiService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.clientId = Number(params['id']);
      this.getBarberServices();
      this.getScheduleStatusValues();
    });
  }

  getBarberServices(): void {
    this.service
      .getAllBarberServices()
      .subscribe(
        (services: BarberServiceMin[]) =>{
          console.log(services)
          this.barberServices = services
        }
      );
  }

  getScheduleStatusValues(): void {
    const values = Object.values(ScheduleStatus);
    this.status = values;
}

  onSubmit(): void {
    const scheduleToCreate : ScheduleToCreate = {
      clientId : this.clientId,
      barberServiceId: this.barberServiceId,
      date: new Date(this.value).toISOString(),
      status: this.stat
    }

    console.log('Saving schedule:', scheduleToCreate);

    this.service
        .createSchedule(scheduleToCreate)
        .subscribe(
          (scheduleSaved: Schedule) => (this.schedule = scheduleSaved)
        );
      this.router.navigate(['']);
    }
}

