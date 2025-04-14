import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ClientMin } from '../../../models/client/client-min.model';
import { BarberShopApiService } from '../../../service/barber-shop-api.service';

@Component({
  selector: 'app-tabs',
  imports: [
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnInit {
  clients: Array<ClientMin> = [];

  constructor(private service: BarberShopApiService){}

  ngOnInit(): void {
    this.service.getAllClients().subscribe(
      (clientData : ClientMin[]) =>{
        this.clients = clientData;
      },
      (error:any) =>{
        console.error('Error to find Clients', error);
      }
    );
  } //TODO: BARBERSERVICE ...
}
