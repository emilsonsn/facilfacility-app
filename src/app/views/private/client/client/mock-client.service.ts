import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from '@models/client';

@Injectable({
    providedIn: 'root',
  })
  export class MockClientService {
    private clients: Client[] = [
      {
        id: 1,
        name: 'Cliente 1',
        cpf_cnpj: '123.456.789-00',
        whatsapp: 1234567890, // Numérico
        email: 'cliente1@example.com',
      },
      {
        id: 2,
        name: 'Cliente 2',
        cpf_cnpj: '98.765.432/0001-00',
        whatsapp: 9876543210, // Numérico
        email: 'cliente2@example.com',
      },
    ];
  
    getClients(): Observable<Client[]> {
      return of(this.clients);
    }

  postClient(client: Client): Observable<{ status: boolean; message: string }> {
    client.id = this.clients.length + 1; // Gera um ID simples
    this.clients.push(client);
    return of({ status: true, message: 'Cliente adicionado com sucesso' });
  }

  patchClient(id: number, client: Client): Observable<{ status: boolean; message: string }> {
    const index = this.clients.findIndex((c) => c.id === id);
    if (index > -1) {
      this.clients[index] = { ...this.clients[index], ...client };
      return of({ status: true, message: 'Cliente atualizado com sucesso' });
    }
    return of({ status: false, message: 'Cliente não encontrado' });
  }

  deleteClient(id: number): Observable<{ status: boolean; message: string }> {
    const index = this.clients.findIndex((c) => c.id === id);
    if (index > -1) {
      this.clients.splice(index, 1);
      return of({ status: true, message: 'Cliente deletado com sucesso' });
    }
    return of({ status: false, message: 'Cliente não encontrado' });
  }
}
