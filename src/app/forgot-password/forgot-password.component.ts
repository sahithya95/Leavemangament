import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public auth:ApiService,public route:Router) { }

  ngOnInit() {

  }
  public email:any;
  forgotpassword(data){
    this.auth.forgot(data).subscribe(data=>{
      if(data['status']==true){
        console.log("sucess")
        this.route.navigateByUrl('/')
      }
      else{
        console.log("failure");
      }
    })
  }
}
