import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  title: string = "Product-Create";
  product: Product = new Product();
  submitBtnTitle: string = "Create";
  vendors: Vendor[] = [];

  constructor(private productSvc: ProductService,
              private vendorSvc: VendorService,
              private router: Router) { }

  ngOnInit(): void {
    this.vendorSvc.list().subscribe(
      jr => {
        this.vendors = jr.data as Vendor[];
        console.log(this.vendors);
    });
  }

  save() {
    this.productSvc.create(this.product).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error creating new product: ", this.product);
      }
      else {
        console.log("Product Saved: ", this.product);
        this.router.navigateByUrl("/product/list");
      }
    });
  }

  backClicked() {
    this.router.navigateByUrl("/product/list");
  }

}
