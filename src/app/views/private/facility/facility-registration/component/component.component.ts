import { Component, EventEmitter, Input, Output } from '@angular/core';
import { action } from '@models/action';
import { component } from '@models/component';
import { ComponentService } from '@services/component.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrl: './component.component.scss'
})
export class ComponentComponent {
  components: component[] = [];

  @Output()
  setComponent: EventEmitter<component|any> = new EventEmitter();

  @Input()
  facility_id: number;

  constructor(
    private readonly _toastr: ToastrService,
    private readonly _componentService: ComponentService,    
  ) {}

  ngOnInit() {
    this.getComponents();    
  }

  getComponents(){
    this._componentService.search({}, {facility_id: this.facility_id})
    .subscribe({
      next: (response) => {
        this.components = response.data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })
  }

  copy(component){
    this.create({
      ...component,
      id: '',
      image: '',
    });
  }

  create(component){  
    this._componentService.create(component)
    .subscribe({
      next: (res) => {
        this._toastr.success('Component copied successfully');
        this.getComponents();
      },
      error: (error) => {
        this._toastr.error(error.error.message);
      }
    })
  }
}
