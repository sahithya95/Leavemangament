import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { load } from '@angular/core/src/render3';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName: string;
  lastName: string;
  constructor(public auth:ApiService,public snackBar:MatSnackBar) { }
  profile:any;
  ngOnInit() {
    // this.firstName = 'Alec';
    // this.lastName = 'Thompson';
    this.load();
  }
  load(){
    this.profile= this.auth.getUserDetails()
    console.log(this.profile,"profile")
     
  }
  edit(data) {
    console.log(this.profile._id)
    this.auth.edituser(data, this.profile._id).subscribe(dataObj => {
      this.profile = dataObj;
      console.log(data);
      if (data != undefined) {
        this.snackBar.open(this.profile["message"], "", {
          duration: 2000
        });
      }
      this.load();
    });
    }
  
}
