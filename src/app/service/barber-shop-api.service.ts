import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, forkJoin, map, mergeMap, Observable } from 'rxjs';
import { ClientMin } from '../models/client/client-min.model';
import {
  Schedule,
  ScheduleMin,
  ScheduleToCreate,
} from '../models/schedule/schedule.model';
import { Client, ClientPost } from '../models/client/client.model';
import { BarberService } from '../models/barberService/barber-service.model';
import { BarberServiceMin } from '../models/barberService/barber-service-min.model';

@Injectable({
  providedIn: 'root',
})
export class BarberShopApiService {
  private baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getAllClients(): Observable<Array<ClientMin>> {
    const url = this.baseUrl + '/client';
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log(response);
        return response.results
          ? response.results.map((client: any) =>
              this.transformRequestToClient(client)
            )
          : [];
      }),
      catchError((error) => {
        console.error('Failed to fetch clients: ', error);
        throw error;
      })
    );
  }

  createClient(client: ClientPost): Observable<Client> {
    const url = this.baseUrl + '/client';

    return this.http.post<Client>(url, client).pipe(
      catchError((error) => {
        console.error('Failed to create client: ', error);
        throw error;
      })
    );
  }

  getAllSchedules(): Observable<Array<ScheduleMin>> {
    const url = this.baseUrl + '/schedule';
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log(response);
        return response.results
          ? response.results.map((schedule: any) =>
              this.transformRequestToScheduleMin(schedule)
            )
          : [];
      }),
      catchError((error) => {
        console.error('Failed to fetch clients: ', error);
        throw error;
      })
    );
  }

  getSchedulesBetweenDates(
    incial: string,
    final: string
  ): Observable<Array<ScheduleMin>> {
    const url = this.baseUrl + '/schedule/date/' + incial + '/' + final;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log(response);
        return response.results
          ? response.results.map((schedule: any) =>
              this.transformRequestToScheduleMin(schedule)
            )
          : [];
      }),
      catchError((error) => {
        console.error('Failed to fetch clients: ', error);
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
    const url = this.baseUrl + '/barbar_service';
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log(response);
        return response.results
          ? response.results.map(
              (barberService: any) =>
                new BarberServiceMin(
                  barberService.id,
                  barberService.name,
                  barberService.duration
                )
            )
          : [];
      }),
      catchError((error) => {
        console.error('Failed to fetch clients: ', error);
        throw error;
      })
    );
  }

  transformRequestToClient(data: any): ClientMin {
    const client = new ClientMin();
    client.id = data.id;
    client.name = data.name;
    return client;
  }

  transformRequestToScheduleMin(data: any): ScheduleMin {
    const schedule = new ScheduleMin();
    schedule.id = data.id;
    schedule.date = data.date;
    schedule.status = data.status;
    return schedule;
  }

  transformRequestToSchedule(data: any): Schedule {
    const schedule = new Schedule();
    schedule.id = data.id;
    schedule.barberService = data.barberService;
    schedule.client = data.client;
    schedule.date = data.date;
    schedule.endTime = data.endTime;
    schedule.startTime = data.startTime;
    schedule.status = data.status;
    return schedule;
  }

  transformRequestToBarberService(data: any): BarberService {
    const barberService = new BarberService();
    barberService.id = data.id;
    barberService.name = data.name;
    barberService.duration = data.duration;
    barberService.price = data.price;
    barberService.note = data.note;
    return barberService;
  }
}
