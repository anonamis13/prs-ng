import { Component, OnInit } from '@angular/core';
  import { BaseComponent } from '../../base/base.component';
  import { Request } from 'src/app/model/request.class';
  import { RequestService } from 'src/app/service/request.service';
  import { SystemService } from 'src/app/service/system.service';
  import { Router, ActivatedRoute } from '@angular/router';
  import { LineItem } from 'src/app/model/line-item.class';
  import { LineItemService } from 'src/app/service/line-item.service';
  
  @Component({
    selector: 'app-request-approve',
    templateUrl: './request-approve.component.html',
    styleUrls: ['./request-approve.component.css']
  })
  
  export class RequestApproveComponent extends BaseComponent implements OnInit {
  
    title: string = "Request-Approve/Reject";
    title2: string = "Lines";
    request: Request = new Request;
    lineItems: LineItem[] = [];
    id: number = 0;
  
    constructor(private requestSvc: RequestService,
      private lineItemSvc: LineItemService,
      protected sysSvc: SystemService,
      private router: Router,
      private route: ActivatedRoute) {
      super(sysSvc);
    }
  
    ngOnInit() {
      super.ngOnInit();
      this.route.params.subscribe(parms => this.id = parms['id']);
      console.log("this.id", this.id);
      this.getLineItems();
    }
  
    getLineItems() {
      this.requestSvc.get(this.id).subscribe(jr => {
        this.request = jr.data as Request;
        console.log("Request: ", this.request);
      });
  
      this.lineItemSvc.getLineItemsForRequest(this.id).subscribe(jr => {
        this.lineItems = jr.data as LineItem[];
        console.log("line-items: ", this.lineItems);
      });
    }
  
    approve(): void {
      this.requestSvc.approve(this.request).subscribe(jr => {
        console.log(this.request);
        this.router.navigateByUrl("/request/list-review/"+this.id);
      });
    }

    reject(): void {
      this.requestSvc.reject(this.request).subscribe(jr => {
        console.log(this.request);
        this.router.navigateByUrl("/request/list-review/"+this.id);
      });
    }
  
  }