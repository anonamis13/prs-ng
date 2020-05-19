import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  title: string = "Vendor-List";
  vendors: Vendor[] = [];

  constructor(private vendorSvc: VendorService,
              protected sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.vendorSvc.list().subscribe(
      jr => {
        this.vendors = jr.data as Vendor[];
        console.log("List of vendors", this.vendors);
      }
    );
  }

}
