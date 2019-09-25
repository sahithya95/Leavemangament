import { Component, OnInit, Inject, ChangeDetectorRef, OnDestroy } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar
} from "@angular/material";
import { ApiService } from "app/services/api.service";
import { Subscription } from "rxjs";
@Component({
  selector: 'app-leavetable',
  templateUrl: './leavetable.component.html',
  styleUrls: ['./leavetable.component.css']
})
export class LeavetableComponent implements OnInit ,OnDestroy{
  data = {};
  constructor(
    public dialog: MatDialog,
    public auth: ApiService,
    public snackBar: MatSnackBar,
    public ref: ChangeDetectorRef
  ) {}
  leaves: any;
  // public subscriptions = new Subscription();
  ngOnInit() {
    this.load();
  }
  ngOnDestroy() {

// this.subscriptions.unsubscribe();
 
  }
  load() {
  this.auth.getAlleave().subscribe(
      user => {
        this.leaves = user;
        // this.ref.detectChanges();
      },
      err => {
        console.error(err);
      }
    );
  }
  sucess: any;
  openDialog(): void {
    const dialogRef = this.dialog.open(AddLeaveModel, {
      width: "450px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      if (result != undefined) {
      this.auth.addnewleave(result).subscribe(dataObj => {
        this.sucess = dataObj;
      
          this.snackBar.open(this.sucess["message"], "", {
            duration: 2000
          });
      
        this.load();
      });
    }
    });
  }

  edit(item, i): void {
    let dialogRef = this.dialog.open(EditLeavedialog, {
      width: "450px",
      data:{ leaveType: item.leaveType, no_of_Day: item.no_of_Day}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result, i);
      if (result != undefined) {
      this.auth.editleave(result, i).subscribe(dataObj => {
        this.sucess = dataObj;
        console.log(result);
      
          this.snackBar.open(this.sucess["message"], "", {
            duration: 2000
          });
     
        this.load();
      });
    }
    });
  }

  delete(item, i): void {
    let dialogRef = this.dialog.open(DeleteLeavedialog, {
      width: "450px",
      data: { leaveType: item.leaveType, no_of_Day: item.no_of_Day}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result, i);
      if (result != undefined) {
        this.auth.deleteleave(i).subscribe(dataObj => {
          this.sucess = dataObj;
          console.log(result);
          this.snackBar.open(this.sucess["message"], "", {
            duration: 2000
          });
          this.load();
        });
      }
    });
  }
}

export interface Leave {
  leaveType: string;
  no_of_Day:number;
}
@Component({
  selector: "AddLeaveModel",
  templateUrl: "addleaveModel.html"
})
export class AddLeaveModel {
  constructor(
    public dialogRef: MatDialogRef<AddLeaveModel>,
    @Inject(MAT_DIALOG_DATA) public tata: Leave
  ) {}
  public data = {
    leaveType:'',
    no_of_Day:'',
    
  };
  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: "editleaveModel",
  templateUrl: "editleaveModel.html"
})
export class EditLeavedialog {
  constructor(
    public dialogRef: MatDialogRef<EditLeavedialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: "deleteleaveModel",
  templateUrl: "deleteleaveModel.html"
})
export class DeleteLeavedialog {
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteLeavedialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

