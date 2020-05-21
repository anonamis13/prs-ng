import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { JsonResponse } from 'src/app/model/json-response.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})

export class RequestReviewComponent extends BaseComponent implements OnInit {

  title: string = "Request-LineItems";
  requests: Request[] = [];
  jr: JsonResponse;

  constructor(private requestSvc: RequestService,
              protected sysSvc: SystemService) {
              super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.requestSvc.getRequestReviewList(this.loggedInUser.id).subscribe(jresp => {
      this.jr = jresp;
      this.requests = this.jr.data as Request[];
      console.log(this.requests);
    });
  }

}