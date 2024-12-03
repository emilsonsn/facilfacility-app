import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  constructor() { }

  actions = [
    {
      component: "Teste",
      name: "Action name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Action name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Action name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Action name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Action name",
      status: "InProgess"
    },
    {
      component: "Teste",
      name: "Action name",
      status: "InProgess"
    },
  ];

  ngOnInit() {
  }

}
