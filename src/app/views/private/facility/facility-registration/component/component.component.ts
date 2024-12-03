import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrl: './component.component.scss'
})
export class ComponentComponent {
  components = [
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

  constructor(
    private readonly _toastr: ToastrService,
  ) {}

  ngOnInit() {
  }

  copy(){
    this._toastr.success('Copiado com sucesso');
  }
}
