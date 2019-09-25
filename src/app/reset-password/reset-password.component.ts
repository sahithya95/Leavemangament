import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
token:any;
  constructor(public auth:ApiService,public route:Router) { }
  data:any;
  public password:any;
  ngOnInit() {
    console.log(window.location.pathname.split('/')[2]);
    this.token = window.location.pathname.split('/')[2];
    this.auth.reset(this.token).subscribe(data=>{
      console.log(data,"rest");
      this.data=data;
      console.log("reset password",this.data,"")
    })
  }
  confirm(data){
    console.log(data,"data",this.data.status)
    if(this.data.status){
      this.auth.resetpwd(data,this.token).subscribe(pwd=>{
        // passwd:any;

        if(pwd['status']==true){
          console.log("sucess")
          this.route.navigateByUrl('/')
        }
        else{
          console.log("failure");
        }
      
      })
    }
    else{
      console.log("timeout");
    }
  }
}
