import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client/client.component';
import { SharedModule } from '@shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRipple, MatRippleModule} from "@angular/material/core";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TablesModule } from '@shared/tables/tables.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

@NgModule({
  declarations: [
    ClientComponent,
    UserRegistrationComponent,
  ],
  imports: [
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
    MatButtonModule
  ]
})
export class ClientModule { }
