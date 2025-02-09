import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule, MatChip } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PrivateRoutingModule } from './private-routing.module';
import {HomeModule} from "@app/views/private/home/home.module";
import { FacilityRegistrationComponent } from './facility/facility-registration/facility-registration.component';
import { FacilityComponent } from './facility/facility/facility.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RegistrationComponent } from './facility/facility-registration/registration/registration.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ActionComponent } from './facility/facility-registration/action/action.component';
import { ComponentComponent } from './facility/facility-registration/component/component.component';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActionRegistrationComponent } from './facility/facility-registration/action/action-registration/action-registration.component';
import { ComponentRegistrationComponent } from './facility/facility-registration/component/component-registration/component-registration.component';
import { HeaderService } from '@services/header.service';



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
    NgxMaskDirective,
    CurrencyMaskModule,
    ToastrModule,
    MatFormField,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChip,
  ],
  providers: [
    provideNgxMask(),
    MatDatepickerModule,
    MatNativeDateModule,
    HeaderService,
  ],
  bootstrap:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,  
  ]
})
export class PrivateModule { }
