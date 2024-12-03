// COMENTANDO AQUIVO PARA MOCKAR DADOS

// import {Component, Input} from '@angular/core';
// import {IMenuItem} from "@models/ItemsMenu";
// import { SidebarService } from '@services/sidebar.service';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrl: './sidebar.component.scss'
// })
// export class SidebarComponent {
//   @Input() menuItem: IMenuItem[] = []

//   constructor(
//     protected readonly _sidebarService : SidebarService
//   ) {}

//   public toggleShowSidebar() {
//     this._sidebarService.showSidebar.set(false);
//   }

// }

import { Component, Input, OnInit } from '@angular/core';
import { IMenuItem } from "@models/ItemsMenu";
import { SidebarService } from '@services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() menuItem: IMenuItem[] = [];

  constructor(
    protected readonly _sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    // Simulando os itens do menu diretamente no frontend
    this.menuItem = [
      { label: 'Facilities', route: '/painel/facility', icon: 'fa-solid fa-tools' },
      { label: 'Users', route: '/painel/users', icon: 'fa-solid fa-users' },
      { label: 'Client area', route: '/painel/settings', icon: 'fa-solid fa-bookmark' },
      { label: 'Profile', route: '/painel/profile', icon: 'fa-solid fa-user-tie' },
    ];
  }

  public toggleShowSidebar(): void {
    this._sidebarService.showSidebar.set(false);
  }
}

