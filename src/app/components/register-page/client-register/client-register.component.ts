import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Client, ClientPost } from '../../../models/client/client.model';
import { Router } from '@angular/router';
import { ClientService } from '../../../service/client.service';

@Component({
  selector: 'app-client-register',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    ReactiveFormsModule, // Certifique-se de que ReactiveFormsModule está aqui
  ],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss',
  standalone: true,
})
export class ClientRegisterComponent {
  clientToRegister: ClientPost = new ClientPost();
  client: Client = new Client();
  name: string = '';
  email: string = '';
  phone: string = '';

  constructor(private service: ClientService, private router: Router) {}

  update(): void {
    const formInputs = document.querySelectorAll('.form input'); // Seleciona todos os inputs dentro da classe .form
    formInputs.forEach((input) => {
      (input as HTMLInputElement).disabled = false; // Remove o atributo "disabled"
    });
  }

  onSubmit() {
    const clientToCreate = {
      name: this.name,
      email: this.email,
      phone: this.phone,
    };

    console.log('Saving client:', clientToCreate);

    this.service.createClient(clientToCreate).subscribe({
      next: (clientSaved: Client) => {
        this.client = clientSaved;
        console.log('Client saved successfully:', clientSaved);
        this.router.navigate(['/schedules'], { queryParams: this.client });
      },
      error: (error: any) => {
        console.error('Error saving client:', error);
      },
    });
  }
}
