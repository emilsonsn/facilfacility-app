import {Component} from '@angular/core';
import {DashboardService} from "@services/dashboard.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private readonly _dashboardService: DashboardService) {}

}
