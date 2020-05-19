import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {
  title: string = "Vendor-Edit";
  vendor: Vendor = new Vendor();
  vendorId: number = 0;
  submitBtnTitle: string = "Save";

  constructor(private vendorSvc: VendorService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.vendorId = parms["id"]);
    this.vendorSvc.get(this.vendorId).subscribe(jr => {
      this.vendor = jr.data as Vendor;
      console.log("Vendor Found! ", this.vendor);
    });
  }

  save() {
    this.vendorSvc.create(this.vendor).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error creating new vendor: ", this.vendor);
      }
      else {
        console.log("Vendor Saved: ", this.vendor);
        this.router.navigateByUrl("/vendor/list");
      }
    });
  }

  backClicked() {
    this.router.navigateByUrl("/vendor/list");
  }

}
