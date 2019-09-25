import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  constructor(private apiservice:ApiService,public router:Router) { }
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  ngOnInit() {
    this.email = new FormControl('', [Validators.required,Validators.email]);
    this.password = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }
  verified:boolean=false;
  
  handleSubmit() {
    console.log(this.loginForm.value);
    this.login(this.loginForm.value)
  }

  user={};
  login(user){
    console.log(user,"login")
  this.apiservice.login(user).subscribe((data) => {
      
      if(data['success']){
        
        this.router.navigateByUrl('/dashboard');
      }
      else{
        this.verified=true;
        
        console.log("ghfsjg")
        this.router.navigateByUrl('/');
      }
  
  }, (err) => {
    this.verified=true;
    console.error(err,"jjh");

  });

  }
  ngOnDestroy(){
// this.subscriptions.unsubscribe();


  }
// 
 
}
