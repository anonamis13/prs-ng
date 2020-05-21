import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from 'src/app/feature/base/base.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private userSvc: UserService, protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.menuItems = [
      new MenuItem("Home","/home","Home Page"),
      new MenuItem("Welcome","/welcome","Welcome Page"),
      new MenuItem("User", "/user/list", "User List"),
      new MenuItem("Vendor", "/vendor/list", "Vendor List"),
      new MenuItem("Product", "/product/list", "Product List"),
      new MenuItem("Request", "/request/list", "Request List")
    ]
    if (this.isReviewer){  
      this.menuItems.push(new MenuItem("Review","/request/list-review/"+this.loggedInUser.id,"Request Review"))
    }
    this.menuItems.push(new MenuItem("Login","/user/login","Login"));
  }

}
