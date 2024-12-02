import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client/client.component';
import { SharedModule } from '@shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule, MatRipple, MatRippleModule} from "@angular/material/core";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TablesModule } from '@shared/tables/tables.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ClientComponent,
    UserRegistrationComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ClientRoutingModule,
    TablesModule,
    SharedModule,
    MatDialogModule,
    MatRippleModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
  ]
})
export class ClientModule { }
