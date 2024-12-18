import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { action } from '@models/action';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  constructor(
    private _toastr: ToastrService
  ) { }

  @Output()
  setAction: EventEmitter<action|any> = new EventEmitter();

  actions = [
    {
      component: "Teste",
      name: "Action name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Action name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Action name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Action name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Action name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Action name",
      status: "InProgess"
    },
  ];

    @Output()
    setComponent: EventEmitter<action> = new EventEmitter();

  ngOnInit() {
  }

  copy(){
    this._toastr.success('Copiado com sucesso');
  }

}
