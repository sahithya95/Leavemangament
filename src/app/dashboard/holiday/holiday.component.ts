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
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit ,OnDestroy{
  data = {};
  constructor(
    public dialog: MatDialog,
    public auth: ApiService,
    public snackBar: MatSnackBar,
    public ref: ChangeDetectorRef
  ) {}
  holidays: any;
  // public subscriptions = new Subscription();
  ngOnInit() {
    this.load();
  }
  ngOnDestroy() {
    // this.ref.detach(); // do this
// this.subscriptions.unsubscribe();
    
  }
  load() {
    this.auth.getAllHolidays().subscribe(
      user => {
        this.holidays = user;
        // this.ref.detectChanges();
      },
      err => {
        console.error(err);
      }
    );
  }
  sucess: any;
  openDialog(): void {
    const dialogRef = this.dialog.open(AddHolidayModel, {
      width: "450px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      if (result != undefined) {
      this.auth.addnewHoliday(result).subscribe(dataObj => {
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
    let dialogRef = this.dialog.open(EditHolidaydialog, {
      width: "450px",
      data:{ date: item.date, Occasion: item.Occasion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result, i);
      if (result != undefined) {
      this.auth.editHoliday(result, i).subscribe(dataObj => {
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
    let dialogRef = this.dialog.open(DeleteHolidaydialog, {
      width: "450px",
      data: { date: item.date, Occasion: item.Occasion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result, i);
      if (result != undefined) {
        this.auth.deleteHoliday(i).subscribe(dataObj => {
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

export interface Holiday {
  date: Date;
  Occasion:string;
}
@Component({
  selector: "AddHolidayModel",
  templateUrl: "addHolidayModel.html"
})
export class AddHolidayModel {
  constructor(
    public dialogRef: MatDialogRef<AddHolidayModel>,
    @Inject(MAT_DIALOG_DATA) public tata: Holiday
  ) {}
  public data = {
    date:'',
    Occasion:''
  };
  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: "editHolidayModel",
  templateUrl: "editHolidayModel.html"
})
export class EditHolidaydialog {
  constructor(
    public dialogRef: MatDialogRef<EditHolidaydialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: "deleteHolidayModel",
  templateUrl: "deleteHolidayModel.html"
})
export class DeleteHolidaydialog {
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteHolidaydialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

