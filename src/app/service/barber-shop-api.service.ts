import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, mergeMap, Observable, retry } from 'rxjs';
import {
  Schedule,
  ScheduleMin,
  ScheduleToCreate,
} from '../models/schedule/schedule.model';
import { BarberServiceMin } from '../models/barberService/barber-service-min.model';

@Injectable({
  providedIn: 'root',
})
export class BarberShopApiService {
  private baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getAllSchedules(): Observable<Array<ScheduleMin>> {
    const url = this.baseUrl + '/schedule';
    return this.http.get<ScheduleMin[]>(url).pipe(
      retry(2),
      catchError((error) => {
        console.error('Failed to fetch schedules: ', error);
        throw error;
      })
    );
  }

  getSchedulesBetweenDates(
    incial: string,
    final: string
  ): Observable<Array<ScheduleMin>> {
    const url = this.baseUrl + '/schedule/date/' + incial + '/' + final;
    console.log(url)
    return this.http.get<ScheduleMin[]>(url).pipe(
      retry(2),
      catchError((error) => {
        console.error('Failed to fetch schedules: ', error);
        throw error;
      })
    );
  }

  createSchedule(schedule: ScheduleToCreate): Observable<Schedule> {
    const url = this.baseUrl + '/schedule';
    return this.http.post<Schedule>(url, schedule).pipe(
      catchError((error) => {
        console.error('Failed to create schedule: ', error);
        throw error;
      })
    );
  }

  getAllBarberServices(): Observable<Array<BarberServiceMin>> {
    const url = this.baseUrl + '/barber_service';
    return this.http.get<BarberServiceMin[]>(url).pipe(
      retry(2),
      catchError((error) => {
        console.error('Failed to fetch barber services: ', error);
        throw error;
      })
    );
  }
}
