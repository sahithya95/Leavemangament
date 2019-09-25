import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar
} from "@angular/material";
import { ApiService } from "app/services/api.service";

@Component({
  selector: 'app-user-leave-request',
  templateUrl: './user-leave-request.component.html',
  styleUrls: ['./user-leave-request.component.css']
})
export class UserLeaveRequestComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private auth: ApiService,
    public snackBar: MatSnackBar,
    private ref: ChangeDetectorRef
  ) {}
public leave:any;
  ngOnInit() {
    this.load();
  }

  // ngOnDestroy() {
  //   this.ref.detach(); // do this

  //   // for me I was detect changes inside "subscribe" so was enough for me to just unsubscribe;
  //   // this.authObserver.unsubscribe();
  // }
  public requests:any;
  public leavetype:any;
  
  load() {
    // this.auth.getuserRequest();
    this.auth.getuserRequest().subscribe(
      user => {
        this.requests = user;
        // this.ref.detectChanges();
      },
      err => {
        console.error(err);
      }
    );

  }
  public sucess: any;
  openDialog(): void {
    const dialogRef = this.dialog.open(ApplyLeaveModel, {
      width: "450px",
     
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      if (result != undefined) {
      this.auth.applyleave(result).subscribe(dataObj => {
        this.sucess = dataObj;
       
          this.snackBar.open("Leave applied", "", {
            duration: 2000
          });
       
        this.load();
      });
    }
    });
  }

}
export interface Request {
  leave_type: string;
  Start_Date:Date;
  End_Date:Date;
}
@Component({
  selector: "ApplyLeave",
  templateUrl: "applyleave.html",
  styleUrls:['./user-leave-request.component.css']
})
export class ApplyLeaveModel implements OnInit{
  constructor(public auth: ApiService,
    public dialogRef: MatDialogRef<ApplyLeaveModel>,
    @Inject(MAT_DIALOG_DATA) public tata: Request
  ) {}
  public leavetype:any;
  // public Start_Date=Date.now();
  ngOnInit() {
    
    this.auth.getAlleave().subscribe(
      leave=>{
        this.leavetype=leave;
      
        console.log(this.leavetype,"types");
      },
      err=>{
        console.log(err);
      }
    )
}
  public data = {
    End_Date:new Date(),
    leave_type:'',
    Start_Date:new Date()

    };
  onNoClick(): void {
    this.dialogRef.close();
  }
 
}