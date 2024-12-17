import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMenuItem } from '@models/ItemsMenu';
import { SidebarService } from '@services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() menuItem: IMenuItem[] = [];
  @Output() collapsedChange = new EventEmitter<boolean>();
  isCollapsed: boolean = false; // Inicialização correta da variável

  constructor(
    protected readonly _sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    // Simulando os itens do menu diretamente no frontend
    this.menuItem = [
      { label: 'Facilities', route: '/painel/facility', icon: 'fa-solid fa-tools' },
      { label: 'Users', route: '/painel/users', icon: 'fa-solid fa-users' },
      { label: 'Client area', route: '/painel/settings', icon: 'fa-solid fa-layer-group' },
      { label: 'Profile', route: '/painel/profile', icon: 'fa-solid fa-user' }
    ];
  }  
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed); // Emite o estado do menu para o layout
  }
}
