import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent extends BaseComponent implements OnInit {
  title: string = "Request-Edit";
  request: Request = new Request();
  requestId: number = 0;
  submitBtnTitle: string = "Save";
  users: User[] = [];

  constructor(private requestSvc: RequestService,
              private userSvc: UserService,
              private router: Router,
              private route: ActivatedRoute,
              protected sysSvc: SystemService) {
              super(sysSvc);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request Found! ", this.request);
    });
    this.userSvc.list().subscribe(
      jr => {
        this.users = jr.data as User[];
        console.log(this.users);
    });
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

  compUser(a: User, b: User): boolean {
    return a && b && a.id === b.id;
  }

  backClicked() {
    this.router.navigateByUrl("/request/list");
  }

  isDisabled(): boolean {
    if (this.loggedInUser.admin) return true;
    else return false;
 }

}
