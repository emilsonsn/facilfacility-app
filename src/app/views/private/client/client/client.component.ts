import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from '@models/client';
import { MockClientService } from './mock-client.service';
import { DialogClientComponent } from '@shared/dialogs/dialog-client/dialog-client.component';
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

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _toastr: ToastrService,
    private readonly _clientService: MockClientService // Usando o serviço mockado
  ) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  private fetchClients(): void {
    this.loading = true;
    this._clientService.getClients().subscribe((clients) => {
      this.clients = clients;
      this.loading = false;
    });
  }

  openDialogClient(service?: Client): void {
    this._dialog
      .open(DialogClientComponent, {
        data: { service },
        width: '80%',
        maxWidth: '850px',
        maxHeight: '90%',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          // Exemplo de manipulação
          console.log(res);
        }
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
