import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  title: string = "Request-List";
  requests: Request[] = [];

  constructor(private requestSvc: RequestService,
              protected sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.requestSvc.list().subscribe(
      jr => {
        this.requests = jr.data as Request[];
        console.log("List of requests", this.requests);
      }
    );
  }

}
