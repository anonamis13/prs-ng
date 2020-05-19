import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title: string = "Product-List";
  products: Product[] = [];

  constructor(private productSvc: ProductService,
              protected sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.productSvc.list().subscribe(
      jr => {
        this.products = jr.data as Product[];
        console.log("List of products", this.products);
      }
    );
  }

}
