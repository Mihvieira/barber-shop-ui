import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Client } from '../../../models/client/client.model';

@Component({
  selector: 'app-client-register',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
  ],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss',
})
export class ClientRegisterComponent {
  client: Client = new Client();

  constructor() {
    this.client.name = 'Cliente Exemplo';
    this.client.email = 'cliente@example.com';
    this.client.phone = '123456789';
  }

  update(): void {
    const formInputs = document.querySelectorAll('.form input'); // Seleciona todos os inputs dentro da classe .form
    formInputs.forEach((input) => {
      (input as HTMLInputElement).disabled = false; // Remove o atributo "disabled"
    });
  }
}
