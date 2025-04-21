import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ClientMin } from '../../../models/client/client-min.model';
import { BarberShopApiService } from '../../../service/barber-shop-api.service';
import { ClientService } from '../../../service/client.service';
import { Subject, takeUntil } from 'rxjs';

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
  clients!: Array<ClientMin>;
  private destroy$ = new Subject<void>();

  constructor(
    private service: BarberShopApiService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  ngOnDestroy():void{
    this.destroy$.next();
    this.destroy$.complete();
  }

  getClients(): void {
    this.clientService
      .getAllClients().pipe(takeUntil(this.destroy$))
      .subscribe((clients: ClientMin[]) => (this.clients = clients));
  }
}
