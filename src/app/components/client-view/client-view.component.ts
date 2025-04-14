import { Component, OnInit } from '@angular/core';
import { Client, ClientPost, ClientUpdate } from '../../models/client/client.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BarberShopApiService } from '../../service/barber-shop-api.service';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-client-view',
  imports: [],
  templateUrl: './client-view.component.html',
  styleUrl: './client-view.component.scss',
})
export class ClientViewComponent implements OnInit {
  id: number | undefined;
  client: Client = new Client();
  clientForm = new FormGroup({
    clientId: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
  });

  constructor(private service: ClientService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = Number(idParam);
        if (!isNaN(this.id)) {
          this.getClientById(this.id);
        } else {
          console.error('Invalid ID parameter:', idParam);
        }
      } else {
        console.error('ID parameter is missing in the route.');
      }
    });
  }

  getClientById(id: number): void {
    this.service.getClientById(id).subscribe({
      next: (result: Client) => {
        this.client = result;
        console.log('Client fetched successfully:', this.client);
      },
      error: (error: any) => {
        console.error('Error fetching client:', error);
      },
    });
  }

  onSubmit() {
    console.warn(this.clientForm.value);
    const formInputs = this.clientForm.value;

    // Validação para o item id
    if (!formInputs.clientId || isNaN(Number(formInputs.clientId))) {
      console.error('Invalid client ID:', formInputs.clientId);
      alert('O ID do cliente é inválido. Por favor, insira um ID válido.');
      return; // Interrompe a execução se o ID for inválido
    }

    const clientToUpdate = new ClientUpdate();
    clientToUpdate.id = parseInt(String(formInputs.clientId ?? 0));
    clientToUpdate.name = formInputs.name ?? '';
    clientToUpdate.email = formInputs.email ?? '';
    clientToUpdate.phone = formInputs.phone ?? '';

    console.log('Saving client:', clientToUpdate);

    this.service.updateClient(clientToUpdate).subscribe({
      next: (clientSaved: Client) => {
        this.client = clientSaved;
        console.log('Client saved successfully:', clientSaved);
      },
      error: (error: any) => {
        console.error('Error saving client:', error);
      },
    });
  }
}
