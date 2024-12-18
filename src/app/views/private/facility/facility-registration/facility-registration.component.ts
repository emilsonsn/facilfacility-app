import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { action } from '@models/action';
import { component } from '@models/component';


@Component({
  selector: 'app-facility-registration',
  templateUrl: './facility-registration.component.html',
  styleUrl: './facility-registration.component.scss'
})

export class FacilityRegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  public menuActive = 'registration';

  public component: component;
  public action: action;

  ngOnInit() {
  
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

