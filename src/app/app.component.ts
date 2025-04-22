import { Component } from '@angular/core';
import { MenuHeaderComponent } from "./components/menu-header/menu-header.component";
import { MenuFooterComponent } from "./components/menu-footer/menu-footer.component";
import { RouterOutlet } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-root',
  imports: [MenuFooterComponent, MenuHeaderComponent, RouterOutlet],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'barber-shop-ui';
}
