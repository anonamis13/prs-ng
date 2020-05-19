import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {
  vendor: Vendor = new Vendor();
  title: string = "Vendor-Detail";
  id: number = 0;
  vendorId: number = 0;

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

  delete() {
    this.vendorSvc.delete(this.vendor.id).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error deleting vendor: ", this.vendor);
      }
      else {
        console.log("Vendor Deleted: ", this.vendor);
        this.router.navigateByUrl("/vendor/list");
      }
    });
  }

}
