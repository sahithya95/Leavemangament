import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-leave-request',
  templateUrl: './admin-leave-request.component.html',
  styleUrls: ['./admin-leave-request.component.css']
})
export class AdminLeaveRequestComponent implements OnInit,OnDestroy {
  // private subscriptions = new Subscription();
  // private subscriptions1 = new Subscription();
  constructor( private auth: ApiService) { }
  status=["approved","rejected"];
  ngOnInit() {
    this.load();
  }
  requests:any;
  load() {
   this.auth.getAllRequest()
 
   .subscribe(
      user => {
        this.requests = user;
        console.log(this.requests,"requset")
        // this.auth.getUserDetails()
        // this.ref.detectChanges();
      },
      err => {
        console.error(err);
      }
    );
  }
  ngOnDestroy(): void {
  //  this.requests.unsubscribe();
  //  this.subscriptions.unsubscribe();
   
    
  }



  Rstatus(data,id){
console.log(data,id);
this.auth.getAllRequeststatus(data,id).subscribe(dataObj => {
  // this.status = dataObj;
  console.log(dataObj,"fsjf");
  this.load();
})


  }



}
