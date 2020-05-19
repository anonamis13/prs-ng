import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  title: string = "User-Detail";
  id: number = 0;
  userId: number = 0;

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

  delete() {
    this.userSvc.delete(this.user.id).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error deleting user: ", this.user);
      }
      else {
        console.log("User Deleted: ", this.user);
        this.router.navigateByUrl("/user/list");
      }
    });
  }

}
