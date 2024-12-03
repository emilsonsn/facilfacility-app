import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-facility-registration',
  templateUrl: './facility-registration.component.html',
  styleUrl: './facility-registration.component.scss'
})

export class FacilityRegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  public menuActive = 'registration';

  ngOnInit() {
  
  }

  changeMenuActive(menu){
    this.menuActive = menu;
  }

  // Função para carregar a foto principal

  }

