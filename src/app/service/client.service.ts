import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { ClientMin } from "../models/client/client-min.model";
import { Observable, map, catchError } from "rxjs";
import { ClientPost, Client, ClientUpdate } from "../models/client/client.model";

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl + '/client';
  }

  getAllClients(): Observable<Array<ClientMin>> {
    return this.http.get<any>(this.baseUrl).pipe(
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
    return this.http.post<Client>(this.baseUrl, client).pipe(
      catchError((error) => {
        console.error('Failed to create client: ', error);
        throw error;
      })
    );
  }

  getClientById(id:number):Observable<Client>{
    const url = this.baseUrl +'/'+ id;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log(response);
        return response.results
          ? response.results.map((client: any) =>
              new Client(
                client.id,
                client.name,
                client.phone,
                client.email
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

  updateClient(clientToUpdate :ClientUpdate): Observable<Client>{
    return this.http.put<Client>(this.baseUrl, clientToUpdate).pipe(
      catchError((error) => {
        console.error('Failed to create client: ', error);
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
}
