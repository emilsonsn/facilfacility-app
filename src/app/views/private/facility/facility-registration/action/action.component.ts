import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  constructor(
    private _toastr: ToastrService
  ) { }

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

  ngOnInit() {
  }

  copy(){
    this._toastr.success('Copiado com sucesso');
  }

}
