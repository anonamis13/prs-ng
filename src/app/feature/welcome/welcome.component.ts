import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent extends BaseComponent implements OnInit {
  user: User = null;
  constructor(protected sysSvc: SystemService) {
              super(sysSvc);
  }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
  }

}