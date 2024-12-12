import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPrivateComponent } from "@shared/layouts/layout-private/layout-private.component";
import { FacilityComponent } from "./facility/facility/facility.component"
import * as facilityRegistrationComponent from './facility/facility-registration/facility-registration.component';
import { SessionService } from '../../store/session.service';
import { ActionComponent } from './facility/facility-registration/action/action.component';
import { ActionRegistrationComponent } from './facility/facility-registration/action/action-registration/action-registration.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPrivateComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        // canActivate: [permissionGuard],
        data: {
          page: 'home'
        }
      },
      {
        path: 'users',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
        // canActivate: [permissionGuard],
        data: {
          page: 'users'
        }
      },
      {
        path: 'facility',
        children: [
          {
            path: '',
            component: FacilityComponent,
            data: { page: 'facility' }
          },
          {
            path: 'registration',
            component: facilityRegistrationComponent.FacilityRegistrationComponent,
            data: { page: 'facility-registration' }
          },
          {
            path: 'registration/:id',
            component: facilityRegistrationComponent.FacilityRegistrationComponent,
            data: { page: 'facility-registration' }
          }
          ,
          {
            path: 'action',
            component: ActionRegistrationComponent,
            data: { page: 'action-registration' }
          },
        ],
        
      },
      {
        path: '**',
        redirectTo: 'facility',
        canMatch: []
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {
  constructor(
    private readonly _sessionService: SessionService
  ) {}
}
