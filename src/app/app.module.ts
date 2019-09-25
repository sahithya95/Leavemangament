import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routes';
import { MatButtonModule, MatRadioModule, MatInputModule, MatMenuModule, MatCheckboxModule, MatFormFieldModule, MatDialogModule, MatSnackBarModule, MatChipsModule, MatSelectModule, MatOptionModule, MatCardModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
// import 'hammerjs';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FigurecardComponent } from './shared/figurecard/figurecard.component';
import { ImagecardComponent } from './shared/imagecard/imagecard.component';
import { TableComponent, AddUserModel, Deletedialog, Editdialog } from './dashboard/table/table.component';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { MsgIconBtnComponent } from './shared/msgiconbtn/msgiconbtn.component';
import { SweetAlertComponent } from './dashboard/sweetalert/sweetalert.component';
import { LoginComponent } from './page/login/login.component';
import { RootComponent } from './dashboard/root/root.component';
import { RegisterComponent } from './page/register/register.component';
import { LockComponent } from './page/lock/lock.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { PriceTableComponent } from './dashboard/component/pricetable/pricetable.component';
import { PanelsComponent } from './dashboard/component/panels/panels.component';

import { SettingsService } from './services/settings.service';
import { WizardComponent } from './dashboard/component/wizard/wizard.component';
import { ApiService } from './services/api.service';

import { HttpClientModule } from '@angular/common/http';
import { GuardService } from './services/guard.service';
import { LeavetableComponent, AddLeaveModel, DeleteLeavedialog, EditLeavedialog ,} from './dashboard/leavetable/leavetable.component';
import { HolidayComponent, AddHolidayModel, EditHolidaydialog, DeleteHolidaydialog } from './dashboard/holiday/holiday.component';
import { AdminLeaveRequestComponent } from './dashboard/admin-leave-request/admin-leave-request.component';
import { UserLeaveRequestComponent, ApplyLeaveModel } from './dashboard/user-leave-request/user-leave-request.component';
// import 'hammerjs';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    FigurecardComponent,
    ImagecardComponent,
    TableComponent,
    NotificationComponent,
    MsgIconBtnComponent,
    SweetAlertComponent,
    LoginComponent,
    RootComponent,
    RegisterComponent,
    LockComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    PriceTableComponent,
    PanelsComponent,
    WizardComponent,
    AddUserModel,
    Editdialog,
    Deletedialog,
    LeavetableComponent,
    AddLeaveModel,
    DeleteLeavedialog,
    EditLeavedialog,
    HolidayComponent,
    AddHolidayModel,
    EditHolidaydialog,
    DeleteHolidaydialog,
    AdminLeaveRequestComponent,
    UserLeaveRequestComponent,
    ApplyLeaveModel,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    // AppServerModule
 
 
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    routing,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,MatChipsModule,
    
  
    

  ],
  providers: [SettingsService,ApiService,GuardService],
  bootstrap: [AppComponent],
  entryComponents:[AddUserModel,Deletedialog,Editdialog,AddLeaveModel,DeleteLeavedialog,EditLeavedialog,
                   AddHolidayModel,DeleteHolidaydialog,EditHolidaydialog,ApplyLeaveModel]
})
export class AppModule { 
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
