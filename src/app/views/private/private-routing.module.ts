import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPrivateComponent } from "@shared/layouts/layout-private/layout-private.component";
import { SessionService } from '../../store/session.service';

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
        path: '**',
        redirectTo: 'home',
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




