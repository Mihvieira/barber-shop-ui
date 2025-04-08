import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-header',
  imports: [],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss'
})
export class MenuHeaderComponent {
  @Input() pageTitle: string |undefined;
}
