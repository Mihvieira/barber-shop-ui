import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ClientMin } from '../models/client/client-min.model';
import { Observable, catchError, retry } from 'rxjs';
import {
  ClientPost,
  Client,
  ClientUpdate,
} from '../models/client/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl + '/client';
  }

  getAllClients(): Observable<Array<ClientMin>> {
    return this.http.get<ClientMin[]>(this.baseUrl).pipe(
      retry(2),
      catchError((error) => {
        console.error('Failed to fetch clients: ', error);
        throw error;
      })
    );
  }

  createClient(client: ClientPost): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client).pipe(
      catchError((error) => {
        console.error('Failed to create client: ', error);
        throw error;
      })
    );
  }

  getClientById(id: number): Observable<Client> {
    const url = this.baseUrl + '/' + id;
    return this.http.get<Client>(url).pipe(
      retry(2),
      catchError((error) => {
        console.error('Failed to fetch client: ', error); // Corrigido o log
        throw error;
      })
    );
  }

  updateClient(clientToUpdate: ClientUpdate): Observable<Client> {
    return this.http.put<Client>(this.baseUrl, clientToUpdate).pipe(
      catchError((error) => {
        console.error('Failed to create client: ', error);
        throw error;
      })
    );
  }
}
