import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})

export class LineItemCreateComponent extends BaseComponent implements OnInit {

  title: string = "Request-LineItem-Create";
  lineItem: LineItem = new LineItem();
  request: Request = new Request;
  products: Product[] = [];
  id: number = 0;
  
  constructor(private lineItemSvc: LineItemService,
    private productSvc: ProductService,
    private requestSvc: RequestService,
    protected sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request: ", this.request);
    });
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
      console.log("products: ", this.products);
    });
  }

  save(): void {
    this.lineItem.request = this.request;
    this.lineItemSvc.create(this.lineItem).subscribe(jr => {
      console.log(this.lineItem);
      this.router.navigateByUrl("/request/lines-for-pr/"+this.lineItem.request.id);
    });
  }
}