import { Component, OnInit } from '@angular/core';
import {
  Client,
  ClientUpdate,
} from '../../models/client/client.model';
import {
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-client-view',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
  ],
  templateUrl: './client-view.component.html',
  styleUrl: './client-view.component.scss',
  standalone: true,
})
export class ClientViewComponent implements OnInit {
  id!: number;
  client: Client = new Client();
  name: string = '';
  email: string = '';
  phone: string = '';
  private destroy$ = new Subject<void>();

  constructor(private service: ClientService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getClientById(id: number): void {
    this.service
      .getClientById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((client: Client) => (this.client = client));
  }

  onSubmit() {
    const clientToUpdate: Partial<ClientUpdate> = {}; // Usar Partial para permitir campos opcionais

    // Verifica quais campos foram alterados e adiciona ao objeto
    if (this.name && this.name !== this.client.name) {
      clientToUpdate.name = this.name;
    }
    if (this.email && this.email !== this.client.email) {
      clientToUpdate.email = this.email;
    }
    if (this.phone && this.phone !== this.client.phone) {
      clientToUpdate.phone = this.phone;
    }

    // Verifica se há alterações
    if (Object.keys(clientToUpdate).length === 0) {
      console.error('No changes to update');
      return;
    }

    // Envia apenas os campos alterados
    this.updateClientData(clientToUpdate);
  }

  updateClientData(clientToUpdate: Partial<ClientUpdate>) {
    this.service
      .updateClient(clientToUpdate)
      .pipe(takeUntil(this.destroy$))
      .subscribe((clientSaved: Client) => {
        this.client = clientSaved;
        console.log('Client updated:', this.client);
      });
  }

  deleteClient(): void {
    this.service.deleteById(this.id).subscribe((response) => {
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
    });
  }
}
