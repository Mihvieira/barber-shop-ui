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
import { BarberService } from '../../models/barberService/barber-service.model';
import { DateSyncService } from '../../service/DateSyncService.service';

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
  status!: ScheduleStatus;
  clientId!: number;
  barberServices: BarberService[] = [];
  scheduleToCreate!: ScheduleToCreate;
  schedule!: Schedule;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BarberShopApiService,
    private dateSyncService: DateSyncService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.clientId = Number(params['id']);
      this.getBarberServices();
    });
    this.dateSyncService.updateDate(this.value);
  }

  getBarberServices(): void {
    this.service.getAllBarberServices().subscribe({
      next: (services) => {
        this.barberServices = services as BarberService[];
      },
      error: (err) => {
        console.error('Error fetching barber services:', err);
      },
    });
  }

  save(): void {
    const formInputs = Array.from(
      document.querySelectorAll('.col-75 input')
    ) as HTMLInputElement[];
    const selectBarberServiceInput =
      document.getElementById('barber-service-id');
    const selectStatusInput = document.getElementById('status');

    if (
      formInputs.length === 4 &&
      selectBarberServiceInput != null &&
      selectStatusInput != null
    ) {
      const [idInput, IdClientInput, dateInput, timeInput] = formInputs;

      const isoDate = new Date(this.value).toISOString();

      this.scheduleToCreate = {
        clientId: parseInt(IdClientInput.value, 10),
        barberServiceId: parseInt(
          (selectBarberServiceInput as HTMLSelectElement).value,
          10
        ),
        date: isoDate,
        status: selectStatusInput as unknown as ScheduleStatus,
      };

      console.log('Saving client:', this.scheduleToCreate);

      this.service.createSchedule(this.scheduleToCreate).subscribe({
        next: (scheduleSaved: Schedule) => {
          this.schedule = scheduleSaved;
          console.log('Schedule saved successfully:', scheduleSaved);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.error('Error saving client:', error);
        },
      });
    } else {
      console.error('Unexpected number of input fields. Expected 4.');
    }
  }
}
