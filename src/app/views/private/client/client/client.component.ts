import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from '@models/client';
import { MockClientService } from './mock-client.service';
import { DialogConfirmComponent } from '@shared/dialogs/dialog-confirm/dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public loading: boolean = false;
  public clients: Client[] = []; // Definição da propriedade
  public searchText: string = '';
  encapsulation: ViewEncapsulation.None

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _toastr: ToastrService,
    private readonly _clientService: MockClientService
  ) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  onSearch(): void {
    // this.loading = true;
    // const searchTextLower = this.searchText.toLowerCase();
    // this._clientService.getClients().subscribe((clients) => {
    //   this.clients = clients.filter(client =>
    //     client.name.toLowerCase().includes(searchTextLower) ||
    //     client.login.toLowerCase().includes(searchTextLower) ||
    //     client.profile.toLowerCase().includes(searchTextLower)
    //   );
    //   this.loading = false;
    // });
  }
  
  private fetchClients(): void {
    this.loading = true;
    this._clientService.getClients().subscribe((clients) => {
      this.clients = clients;
      this.loading = false;
    });
  }

  onDeleteClient(id: number): void {
    const text = 'Tem certeza? Essa ação não pode ser revertida!';
    this._dialog
      .open(DialogConfirmComponent, { data: { text } })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this.clients = this.clients.filter((client) => client.id !== id); // Remove do mock
          this._toastr.success('Cliente removido com sucesso');
        }
      });
  }
}
