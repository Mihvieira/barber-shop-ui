import { Component } from '@angular/core';
import { MenuHeaderComponent } from "./components/menu-header/menu-header.component";
import { MenuFooterComponent } from "./components/menu-footer/menu-footer.component";
import { MainComponent } from "./components/dashboard/main/main.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MenuFooterComponent, MainComponent, MenuHeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'barber-shop-ui';
}
