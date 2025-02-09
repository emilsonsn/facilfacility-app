import {Component, ElementRef, Renderer2} from '@angular/core';
import {IMenuItem} from "@models/ItemsMenu";
import {SidebarService} from '@services/sidebar.service';
import {Subscription} from "rxjs";
import {User} from "@models/user";
import {UserService} from "@services/user.service";
import {ApiResponse} from "@models/application";
import { SessionService } from '@store/session.service';
import { SessionQuery } from '@store/session.query';
import { HeaderService } from '@services/header.service';

@Component({
  selector: 'app-layout-private',
  templateUrl: './layout-private.component.html',
  styleUrl: './layout-private.component.scss'
})
export class LayoutPrivateComponent {
  headerTitle: string = '';
  isCollapsed = false;
  private subscription: Subscription;

  public permitedMenuItem: IMenuItem[] = [];

  public menuItem: IMenuItem[] = [
    {
      label: 'Facilities Area',
      icon: 'icon-facility-menu-item', 
      route: '/painel/facility',
    },
    {
      label: 'Facility Registration',
      icon: 'fa-solid fa-house',
      route: '/painel/facility/registration',
    },
    {
      label: 'Pedidos',
      icon: 'fa-solid fa-box',
      route: '/painel/orders'
    },
    {
      label: 'Solicitações',
      icon: 'fa-solid fa-bookmark',
      route: '/painel/requests'
    },
    {
      label: 'Colaboradores',
      icon: 'fa-solid fa-users',
      route: '/painel/collaborator'
    },
    {
      label: 'Fornecedores',
      icon: 'fa-solid fa-truck',
      route: '/painel/provider'
    },
    {
      label: 'Obras',
      icon: 'fa-solid fa-person-digging',
      route: '/painel/construction'
    },
    {
      label: 'User',
      icon: 'fa-solid fa-user-tie',
      route: '/painel/users'
    },
    {
      label: 'User Registration',
      icon: 'fa-solid fa-user-tie',
      route: '/painel/users/registration'
    },
    {
      label: 'Serviços',
      icon: 'fa-solid fa-tools',
      route: '/painel/services'
    },
    {
      label: 'Tarefas',
      icon: 'fa-solid fa-tasks',
      route: '/painel/tasks'
    }
  ]

  protected isMobile: boolean = window.innerWidth >= 1000;
  private resizeSubscription: Subscription;
  user: User;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private readonly _sidebarService: SidebarService,
    private readonly _userService: UserService,
    private readonly _sessionService: SessionService,
    private readonly _sessionQuery : SessionQuery,
    private headerService: HeaderService,
  ) { }


  ngOnInit(): void {

    this.headerService.headerTitle$.subscribe((title) => {
      this.headerTitle = title;
    });

    document.getElementById('template').addEventListener('click', () => {
      this._sidebarService.retractSidebar();
    });
  }


  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSidebarCollapsedChange(collapsed: boolean): void {
    this.isCollapsed = collapsed;
  }

}
