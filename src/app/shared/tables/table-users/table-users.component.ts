import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Order, PageControl } from '@models/application';
import { Client } from '@models/client'; // Modelo do cliente
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { UserService } from '@services/user.service';
import { User } from '@models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
})
export class TableUserComponent {
  @Input() searchTerm: string = ''; // Filtro de busca
  @Input() loading: boolean = false; // Define se a tabela está carregando
  @Input() filters: any; // Filtros recebidos como entrada
  @Input() users: User[] = [];

  @Output() onClientClick = new EventEmitter<Client>(); // Evento para clique em cliente
  @Output() onDeleteClientClick = new EventEmitter<number>(); // Evento para exclusão de cliente


  public columns = [
    { slug: 'email', title: 'Email', align: 'text-start', order: true },
    { slug: 'name', title: 'Name', align: 'text-start', order: true },
    { slug: 'profile', title: 'Profile', align: 'text-center', order: false },
    { slug: 'active', title: 'Status', align: 'text-center', order: false },
  ];

  public pageControl: PageControl = {
    take: 10,
    page: 1,
    itemCount: 0,
    pageCount: 0,
    orderField: 'id',
    order: Order.ASC,
  };

  constructor(
    private readonly _toastr: ToastrService,
    private readonly _userService: UserService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { filters, searchTerm, loading } = changes;

    if (
      searchTerm?.previousValue &&
      searchTerm?.currentValue !== searchTerm?.previousValue
    ) {
      this._onSearch();
    } else if (!loading?.currentValue) {
      this._onSearch();
    } else if (filters?.previousValue && filters?.currentValue) {
      this._onSearch();
    }
  }

  private _initOrStopLoading(): void {
    this.loading = !this.loading;
  }

  private _onSearch(): void {
    this.pageControl.search_term = this.searchTerm || '';
    this.pageControl.page = 1;
    this.search();
  }

  search(): void {
    this._initOrStopLoading();

    this._userService
      .getUsers(this.pageControl, this.filters)
      .pipe(finalize(() => this._initOrStopLoading()))
      .subscribe({
        next: (res) => {
          this.users = res.data;
          console.log(this.users);
          this.pageControl.page = res.current_page;
          this.pageControl.itemCount = res.total;
          this.pageControl.pageCount = res.last_page;
        },
        error: (err) => {
          this._toastr.error(
            err?.error?.message || 'Ocorreu um erro ao buscar os dados'
          );
        },
      });
  }

  pageEvent($event: any): void {
    this.pageControl.page = $event.pageIndex + 1;
    this.pageControl.take = $event.pageSize;
    this.search();
  }

  onClientRowClick(client: Client): void {
    this.onClientClick.emit(client); // Emite o cliente selecionado
  }

  onDeleteRowClick(clientId: number): void {
    this.onDeleteClientClick.emit(clientId); // Emite o ID do cliente para exclusão
  }

  trackByColumn(index: number, column: any): string {
    return column.slug;
  }

  trackByClient(index: number, client: Client): number {
    return client.id;
  }
}
