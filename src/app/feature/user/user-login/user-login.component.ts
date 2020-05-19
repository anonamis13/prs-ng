import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  message: string = "";
  user: User = new User();

  constructor(private userSvc: UserService,
              private sysSvc: SystemService,
              private router: Router) { }

  ngOnInit(): void {
    this.sysSvc.loggedInUser = null;
  }

  login() {
    this.userSvc.login(this.user).subscribe(
      jr => {
        if (jr.errors == null) {
          this.user = jr.data as User;
          this.sysSvc.loggedInUser = this.user;
          this.router.navigateByUrl("/home");
        }
        else {
          this.message = jr.errors as string;
        }
      }
    );
  }

}
