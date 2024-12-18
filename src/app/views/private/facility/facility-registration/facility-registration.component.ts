import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { action } from '@models/action';
import { component } from '@models/component';


@Component({
  selector: 'app-facility-registration',
  templateUrl: './facility-registration.component.html',
  styleUrl: './facility-registration.component.scss'
})

export class FacilityRegistrationComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private readonly _activatedRouteouter: ActivatedRoute

  ) {}

  public menuActive = 'registration';

  public component: component;
  public action: action;

  public facility_id: number;

  ngOnInit() {
    this.getFacilityId();
  }

  getFacilityId(){
    this._activatedRouteouter.paramMap.subscribe(params => {
      const id = params.get('id');
      this.facility_id = parseInt(id);      
    });
  }

  changeMenuActive(menu){
    this.menuActive = menu;
  }

  setComponent(component?){
    this.component = component;
    this.menuActive = 'component-registration';
  }

  setAction(action?){
    this.action = action;
    this.menuActive = 'actions-registration';
  }
}

