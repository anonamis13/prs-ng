import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  request: Request = new Request();
  title: string = "Request-Detail";
  id: number = 0;
  requestId: number = 0;

  constructor(private requestSvc: RequestService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request Found! ", this.request);
    });
  }

  delete() {
    this.requestSvc.delete(this.request.id).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error deleting request: ", this.request);
      }
      else {
        console.log("Request Deleted: ", this.request);
        this.router.navigateByUrl("/request/list");
      }
    });
  }

}
