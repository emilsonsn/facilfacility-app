import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrl: './facility.component.scss'
})

export class FacilityComponent {
  facilitys = [
    {
      component: "Teste",
      name: "Facility name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Facility name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Facility name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Facility name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Facility name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Facility name",
      status: "InProgess"
    },
  ];

  constructor(
    private readonly _toastr: ToastrService,
    private readonly _router: Router
  ) {}

  ngOnInit() {
  }

  copy(){
    this._toastr.success('Copiado com sucesso');
  }

  goTo() {
    this._router.navigate(['/painel/facility/registration']);
  }
  
}

