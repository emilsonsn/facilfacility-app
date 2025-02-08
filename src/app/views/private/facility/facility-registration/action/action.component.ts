import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { action } from '@models/action';
import { ActionService } from '@services/action.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @Output() setAction: EventEmitter<action|any> = new EventEmitter();
  @Input() facility_id: number;
  @Output() setComponent: EventEmitter<action> = new EventEmitter();

  actions: any[] = [];

  // Opções de status
  options = [
    { name: 'In progress', color: '#0275d8' },
    { name: 'Done', color: '#5cb85c' },
    { name: 'Assigned', color: '#f0ad4e' }
  ];

  constructor(
    private _toastr: ToastrService,
    private readonly _actionService: ActionService
  ) { }

  ngOnInit() {
    this.getActions();
  }

  getActions(){
    this._actionService.getActions()
    .subscribe({
      next: (res) => {
        this.actions = res.data;
      }
    })
  }

  // Simula a busca de actions
  // getActions() {
  //   // Simulando dados da API
  //   this.actions = [
  //     { id: 1, name: 'Action 1', status: 'In progress' },
  //     { id: 2, name: 'Action 2', status: 'Done' },
  //     { id: 3, name: 'Action 3', status: 'Assigned' }
  //   ];
  // }

  // Atualiza o status da action
  updateActionStatus(event: Event, action: any) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedStatus = selectElement.value;

    // Atualiza localmente
    action.status = selectedStatus;

    // Aqui, você poderia fazer uma chamada para a API para atualizar o status no backend
    console.log(`Atualizando action ${action.id} para ${selectedStatus}`);

    // Feedback ao usuário
    this._toastr.success('Status atualizado com sucesso');
  }

  // Define a cor do status
  getOptionColor(status: string): string {
    const option = this.options.find(opt => opt.name === status);
    return option ? option.color : '#ccc';
  }

  copy() {
    this._toastr.success('Copiado com sucesso');
  }
}
