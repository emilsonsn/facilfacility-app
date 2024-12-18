import { Component, EventEmitter, Output } from '@angular/core';
import { action } from '@models/action';
import { component } from '@models/component';
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

  constructor(
    private readonly _toastr: ToastrService,
  ) {}

  ngOnInit() {
  }

  copy(){
    this._toastr.success('Copiado com sucesso');
  }
}
