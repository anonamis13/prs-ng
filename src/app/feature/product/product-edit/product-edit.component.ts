import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title: string = "Product-Edit";
  product: Product = new Product();
  productId: number = 0;
  submitBtnTitle: string = "Save";
  vendors: Vendor[] = [];

  constructor(private productSvc: ProductService,
              private vendorSvc: VendorService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.productId = parms["id"]);
    this.productSvc.get(this.productId).subscribe(jr => {
      this.product = jr.data as Product;
      console.log("Product Found! ", this.product);
    });
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

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }

  backClicked() {
    this.router.navigateByUrl("/product/list");
  }

}
