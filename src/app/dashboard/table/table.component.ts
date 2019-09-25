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
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit,OnDestroy {
  public data = {
    email:'',
    password:'',
    role:''
  };
  constructor(
    public dialog: MatDialog,
    public auth: ApiService,
    public snackBar: MatSnackBar,
    public ref: ChangeDetectorRef
  ) {}
  users: any;
  // public subscriptions = new Subscription();
  ngOnInit() {
    this.load();
  }
  ngOnDestroy() {
// this.subscriptions.unsubscribe();
  
  }
  load() {
    this.auth.adduser().subscribe(
      user => {
        this.users = user;
        console.log(this.users,"requests");
        // this.ref.detectChanges();
      },
      err => {
        console.error(err);
      }
    );
  }
  sucess: any;
  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserModel, {
      width: "450px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);

      this.auth.addnewuser(result).subscribe(dataObj => {
        this.sucess = dataObj;
        if (result != undefined) {
          this.snackBar.open(this.sucess["message"], "", {
            duration: 2000
          });
        }
        this.load();
      });
    });
  }

  edit(item, i): void {
    let dialogRef = this.dialog.open(Editdialog, {
      width: "450px",
      data: { email: item.email, password: item.password, role: item.role }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result, i);
      this.auth.edituser(result, i).subscribe(dataObj => {
        this.sucess = dataObj;
        console.log(result);
        if (result != undefined) {
          this.snackBar.open(this.sucess["message"], "", {
            duration: 2000
          });
        }
        this.load();
      });
    });
  }

  delete(item, i): void {
    let dialogRef = this.dialog.open(Deletedialog, {
      width: "450px",
      data: { email: item.email, password: item.password, role: item.role }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result, i);
      if (result != undefined) {
        this.auth.deleteuser(i).subscribe(dataObj => {
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

export interface User {
  email: string;
  password: string;
  role: string;
}
@Component({
  selector: "adduserModel",
  templateUrl: "adduserModel.html"
})
export class AddUserModel {
  constructor(
    public dialogRef: MatDialogRef<AddUserModel>,
    @Inject(MAT_DIALOG_DATA) public tata: User
  ) {}
  public data = {
    email:'',
    password:'',
    role:'Client'
  };
  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: "edituserModel",
  templateUrl: "edituserModel.html"
})
export class Editdialog {
  constructor(
    public dialogRef: MatDialogRef<Editdialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: "deleteuserModel",
  templateUrl: "deleteuserModel.html"
})
export class Deletedialog {
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Deletedialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
