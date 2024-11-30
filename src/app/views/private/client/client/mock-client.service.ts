import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from '@models/client';

@Injectable({
  providedIn: 'root',
})

export class MockClientService {
  private mockClients: Client[] = [
    { id: 1, name: 'LunarTech Solutions', login: 'lunartech', profile: 'Admin', active: true },
    { id: 2, name: 'PixelWave Digital', login: 'pixelwave', profile: 'User', active: false },
    { id: 3, name: 'Quantum Networks', login: 'quantum_net', profile: 'Admin', active: true },
    { id: 4, name: 'Nebula Ventures', login: 'nebula_v', profile: 'User', active: true },
    { id: 5, name: 'EchoSphere Labs', login: 'echo_sphere', profile: 'Admin', active: false },
    { id: 6, name: 'Stellar Dynamics', login: 'stellar_dynamics', profile: 'User', active: true },
    { id: 7, name: 'FusionCore Enterprises', login: 'fusioncore', profile: 'Admin', active: true },
    { id: 8, name: 'NovaBridge Technologies', login: 'novabridge', profile: 'User', active: false },
    { id: 9, name: 'Hyperion Systems', login: 'hyperion_sys', profile: 'Admin', active: true },
    { id: 10, name: 'Orion Nexus', login: 'orion_nexus', profile: 'User', active: false },
  ];

  // Retorna todos os clientes
  getClients(): Observable<Client[]> {
    return of(this.mockClients);
  }

  // Adiciona um novo cliente
  postClient(client: Client): Observable<{ status: boolean; message: string }> {
    client.id = this.mockClients.length + 1; // Gera um ID incremental
    this.mockClients.push(client);
    return of({ status: true, message: 'Cliente adicionado com sucesso' });
  }

  // Atualiza um cliente existente
  patchClient(id: number, client: Client): Observable<{ status: boolean; message: string }> {
    const index = this.mockClients.findIndex((c) => c.id === id);
    if (index > -1) {
      this.mockClients[index] = { ...this.mockClients[index], ...client };
      return of({ status: true, message: 'Cliente atualizado com sucesso' });
    }
    return of({ status: false, message: 'Cliente não encontrado' });
  }

  // Deleta um cliente existente
  deleteClient(id: number): Observable<{ status: boolean; message: string }> {
    const index = this.mockClients.findIndex((c) => c.id === id);
    if (index > -1) {
      this.mockClients.splice(index, 1);
      return of({ status: true, message: 'Cliente deletado com sucesso' });
    }
    return of({ status: false, message: 'Cliente não encontrado' });
  }
}
