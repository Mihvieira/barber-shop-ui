import { Component, OnInit } from '@angular/core';
import {
  Client,
  ClientUpdate,
} from '../../models/client/client.model';
import {
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from '../../service/dialog.service';
import { HttpResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-client-view',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './client-view.component.html',
  styleUrl: './client-view.component.scss',
  standalone: true,
})
export class ClientViewComponent implements OnInit {
  id!: number;
  client: Client = new Client();
  name: string = this.client.name ?? '';
  email: string = this.client.email ?? '';
  phone: string = this.client.phone ?? '';
  private destroy$ = new Subject<void>();

  constructor(
    private service: ClientService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
  ) {}

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
      .subscribe((client: Client) => {
        this.client = client;
        this.name = client.name ?? '';
        this.email = client.email ?? '';
        this.phone = client.phone ?? '';
      });
  }

  updateClientData() {
    const clientToUpdate: Partial<ClientUpdate> = {}; // Usar Partial para permitir campos opcionais
    clientToUpdate.id = this.id;
    clientToUpdate.name = this.name;
    clientToUpdate.email = this.email;
    clientToUpdate.phone = this.phone;
    console.log('client to update: ', clientToUpdate);

    this.dialogService
      .openConfirmationDialog(
        'Confirm Update',
        'Are you sure you want to update this item?'
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: any) => {
        if (result) {
          this.service
            .updateClient(clientToUpdate)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (clientSaved: Client) => {
                this.client = clientSaved;
                this.name = clientSaved.name ?? '';
                this.email = clientSaved.email ?? '';
                this.phone = clientSaved.phone ?? '';
                this.dialogService.openConfirmationDialog(
                  'Sucesso',
                  'Cliente atualizado com sucesso'
                );
              },
              error: (err: any) => {
                console.error('Error deleting client:', err);
                this.dialogService.openConfirmationDialog(
                  'Erro',
                  `Falha ao atualizar o cliente. Por favor, tente novamente. Erro: ${err.error}`
                );
              },
            });
        } else {
          console.log('update cancelled');
        }
      });
  }

  deleteClient(): void {
    this.dialogService
      .openConfirmationDialog(
        'Confirm Delete',
        'Are you sure you want to delete this item?'
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: any) => {
        if (result) {
          this.service
            .deleteById(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (response: HttpResponse<void>) => {
                if (response.status === 200) {
                  this.id = 0;
                  this.client = new Client();
                  this.name = '';
                  this.email = '';
                  this.phone = '';
                  this.dialogService.openConfirmationDialog(
                    'Sucesso',
                    'Cliente deletado com sucesso'
                  );
                }
              },
              error: (err: any) => {
                console.error('Error deleting client:', err);
                this.dialogService.openConfirmationDialog(
                  'Erro',
                  `Falha ao deletar o cliente. Por favor, tente novamente. Erro: ${err.error}`
                );
              },
            });
        } else {
          console.log('Delete cancelled');
        }
      });
  }

  scheduleClient() {
    this.router.navigate(['/schedules'], { queryParams: this.client });
  }
}
