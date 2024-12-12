import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacilityService } from '@services/facility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrl: './facility.component.scss'
})

export class FacilityComponent {
  facilitys = [];

  constructor(
    private readonly _toastr: ToastrService,
    private readonly _router: Router,
    private readonly _facilityService: FacilityService,
  ) {}

  ngOnInit() {
    this.getFacilitys();
  }

  getFacilitys(){
    this._facilityService.search()
    .subscribe({
      next: (response) => {
        this.facilitys = response.data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })
  }

  copy(facility){
    facility.id = null;
    this._facilityService.create({
      id: null,
      ...facility
    })
    .subscribe({
      next: (res) => {
        this.getFacilitys();
        this._toastr.success('Copiado com sucesso');
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })
  }

  goTo() {
    this._facilityService.create({})
    .subscribe({
      next: (res) => {
        this._router.navigate([`/painel/facility/registration/${res.data.id}`]);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })    
  }

  goToFacility(facility){
    this._router.navigate([`/painel/facility/registration/${facility.id}`]);
  }
  
}

