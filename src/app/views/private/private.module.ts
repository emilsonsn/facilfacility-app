import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivateRoutingModule } from './private-routing.module';
import {HomeModule} from "@app/views/private/home/home.module";
import { FacilityRegistrationComponent } from './facility/facility-registration/facility-registration.component';
import { FacilityComponent } from './facility/facility/facility.component';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RegistrationComponent } from './facility/facility-registration/registration/registration.component';
import { ActionComponent } from './facility/facility-registration/action/action.component';
import { ComponentComponent } from './facility/facility-registration/component/component.component';
import { ToastrModule } from 'ngx-toastr';
import { ActionRegistrationComponent } from './facility/facility-registration/action/action-registration/action-registration.component';
import { ComponentRegistrationComponent } from './facility/facility-registration/component/component-registration/component-registration.component';



@NgModule({
    declarations: [
      FacilityComponent,
      FacilityRegistrationComponent,
      RegistrationComponent,      
      ComponentComponent,
      ActionComponent,
      ActionRegistrationComponent,
      ComponentRegistrationComponent
  ],

  imports: [
    CommonModule,
    PrivateRoutingModule,
    HomeModule,
    MatSelectModule,
    MatInputModule,
    MatSelectModule,
    ToastrModule,
    MatFormField,
    ReactiveFormsModule,
  ]
})
export class PrivateModule { }
