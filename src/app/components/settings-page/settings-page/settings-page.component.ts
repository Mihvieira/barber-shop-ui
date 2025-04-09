import { Component } from '@angular/core';
import { MenuHeaderComponent } from "../../menu-header/menu-header.component";
import { TabsComponent } from "../tabs/tabs.component";

@Component({
  selector: 'app-settings-page',
  imports: [MenuHeaderComponent, TabsComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {

}
