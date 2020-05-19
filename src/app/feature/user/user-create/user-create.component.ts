import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  title: string = "User-Create";
  user: User = new User();
  submitBtnTitle: string = "Create";

  constructor(private userSvc: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  save() {
    this.userSvc.create(this.user).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error creating new user: ", this.user);
      }
      else {
        console.log("User Saved: ", this.user);
        this.router.navigateByUrl("/user/list");
      }
    });
  }

  backClicked() {
    this.router.navigateByUrl("/user/list");
  }

}
