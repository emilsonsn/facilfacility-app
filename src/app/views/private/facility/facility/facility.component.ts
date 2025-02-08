import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacilityService } from '@services/facility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent {
  facilitys = [];
  options = [
    { name: 'In progress', color: '#0275d8' },
    { name: 'Done', color: '#5cb85c' },
    { name: 'Assigned', color: '#f0ad4e' }
  ];

  constructor(
    private readonly _toastr: ToastrService,
    private readonly _router: Router,
    private readonly _facilityService: FacilityService,
  ) {}

  ngOnInit() {
    this.getFacilitys();
  }

  getFacilitys() {
    this._facilityService.search()
      .subscribe({
        next: (response) => {
          this.facilitys = response.data.map((facility: any) => ({
            ...facility,
            status: facility.status || 'In progress' // Define um status padrão se não existir
          }));
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }
  

  getOptionColor(status: string): string {
    const option = this.options.find(opt => opt.name === status);
    return option ? option.color : '#ffffff'; // Cor padrão caso não encontre
  }

  updateFacilityStatus(event: Event, facility: any) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedStatus = selectElement.value;
  
    facility.status = selectedStatus;
  
    // Envia a atualização para o backend
    this._facilityService.update(facility.id, { ...facility, status: selectedStatus })
      .subscribe({
        next: () => {
          this._toastr.success('Status atualizado com sucesso');
        },
        error: (error) => {
          console.error('Error:', error);
          this._toastr.error('Erro ao atualizar o status');
        }
      });
  }
  

  copy(facility: any) {
    facility.id = null;
    this._facilityService.create({
      id: null,
      ...facility
    })
    .subscribe({
      next: () => {
        this.getFacilitys();
        this._toastr.success('Copiado com sucesso');
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
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
      });
  }

  goToFacility(facility: any) {
    this._router.navigate([`/painel/facility/registration/${facility.id}`]);
  }
}
