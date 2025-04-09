import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuHeaderComponent } from "./components/menu-header/menu-header.component";
import { MenuFooterComponent } from "./components/menu-footer/menu-footer.component";
import { MainComponent } from "./components/dashboard/main/main.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuFooterComponent, MainComponent, MenuHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'barber-shop-ui';
}
