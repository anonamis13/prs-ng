import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = "Request-Create";
  request: Request = new Request();
  submitBtnTitle: string = "Create";
  users: User[] = [];

  constructor(private requestSvc: RequestService,
              private sysSvc: SystemService,
              private router: Router) { }

  ngOnInit(): void {
    this.request.user = this.sysSvc.loggedInUser;
    console.log("this.request.user ", this.request.user);
  }

  save() {
    this.requestSvc.create(this.request).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error creating new request: ", this.request);
      }
      else {
        console.log("Request Saved: ", this.request);
        this.router.navigateByUrl("/request/list");
      }
    });
  }

  backClicked() {
    this.router.navigateByUrl("/request/list");
  }

}
