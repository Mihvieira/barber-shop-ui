import { Component, input, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {
  @Input() pageTitle!: string;

  constructor() {}

  ngOnInit(): void {
    console.log(this.pageTitle);
  }

}
