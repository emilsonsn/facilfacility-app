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

  constructor(
    private _toastr: ToastrService,
    private readonly _actionService: ActionService
  ) { }

  @Output()
  setAction: EventEmitter<action|any> = new EventEmitter();

  @Input()
  facility_id: number;

  actions: any[];

  @Output()
  setComponent: EventEmitter<action> = new EventEmitter();

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

  copy(){
    this._toastr.success('Copiado com sucesso');
  }

}
