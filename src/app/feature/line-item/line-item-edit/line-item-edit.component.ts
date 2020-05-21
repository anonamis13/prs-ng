import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Request } from 'src/app/model/request.class';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})

export class LineItemEditComponent extends BaseComponent implements OnInit {

  title: string = "Request-LineItem-Edit";
  lineItem: LineItem = new LineItem();
  request: Request = new Request;
  products: Product[] = [];
  id: number = 0;

  constructor(private lineItemSvc: LineItemService,
    private productSvc: ProductService,
    protected sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute) {
    super(sysSvc);
  }

  ngOnInit() {
    this.route.params.subscribe(parms => this.id = parms['id']);

    this.lineItemSvc.get(this.id).subscribe(jr => {
      this.lineItem = jr.data as LineItem;
      console.log("lineitem to edit", this.lineItem);
    });
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
      console.log("products: ", this.products);
    });
  }

  update(): void {
    this.lineItemSvc.edit(this.lineItem).subscribe(jr => {
      console.log(this.lineItem);
      this.router.navigateByUrl("/request/lines-for-pr/"+this.lineItem.request.id);
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }

}