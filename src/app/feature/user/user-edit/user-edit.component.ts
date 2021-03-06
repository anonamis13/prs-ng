import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title: string = "User-Edit";
  user: User = new User();
  userId: number = 0;
  submitBtnTitle: string = "Save";

  constructor(private userSvc: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.userId = parms["id"]);
    this.userSvc.get(this.userId).subscribe(jr => {
      this.user = jr.data as User;
      console.log("User Found! ", this.user);
    });
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
