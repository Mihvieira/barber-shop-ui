import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Client, ClientPost } from '../../../models/client/client.model';
import { BarberShopApiService } from '../../../service/barber-shop-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-register',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    ReactiveFormsModule
  ],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss',
  standalone: true,
})
export class ClientRegisterComponent {
  client: Client = new Client();
  clientForm = new FormGroup({
    clientId: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  })

  constructor(private service: BarberShopApiService, private router: Router) {}

  update(): void {
    const formInputs = document.querySelectorAll('.form input'); // Seleciona todos os inputs dentro da classe .form
    formInputs.forEach((input) => {
      (input as HTMLInputElement).disabled = false; // Remove o atributo "disabled"
    });
  }

  onSubmit(){
    console.warn(this.clientForm.value);
    const formInputs = this.clientForm.value;
    const clientToCreate = new ClientPost();
    clientToCreate.name = formInputs.name ?? '';
    clientToCreate.email = formInputs.email ?? '';
    clientToCreate.phone = formInputs.phone ?? '';

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
