import { Component } from '@angular/core';
import { MenuHeaderComponent } from "../../menu-header/menu-header.component";
import { ClientFormComponent } from "../client-form/client-form.component";

@Component({
  selector: 'app-client-register',
  imports: [MenuHeaderComponent, ClientFormComponent],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss'
})
export class ClientRegisterComponent {

}
