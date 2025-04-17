import { Component, OnInit } from '@angular/core';
import {
  Client,
  ClientPost,
  ClientUpdate,
} from '../../models/client/client.model';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BarberShopApiService } from '../../service/barber-shop-api.service';
import { ClientService } from '../../service/client.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    this.service
      .getClientById(id)
      .subscribe((client: Client) => (this.client = client));
  }

  onSubmit() {
    const clientToUpdate: ClientUpdate = {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
    };

    console.log('Saving client:', clientToUpdate);

    this.service
      .updateClient(clientToUpdate)
      .subscribe((clientSaved: Client) => (this.client = clientSaved));
  }
}
