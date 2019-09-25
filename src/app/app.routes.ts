/**
 * Created by wangdi on 26/5/17.
 */
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { TableComponent } from './dashboard/table/table.component';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { SweetAlertComponent } from './dashboard/sweetalert/sweetalert.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { PriceTableComponent } from './dashboard/component/pricetable/pricetable.component';
import { PanelsComponent} from './dashboard/component/panels/panels.component';
import { WizardComponent } from './dashboard/component/wizard/wizard.component';

import { RootComponent } from './dashboard/root/root.component';
import { LoginComponent } from './page/login/login.component';
import { LockComponent } from './page/lock/lock.component';
import { RegisterComponent } from './page/register/register.component';
import { GuardService } from './services/guard.service';
import { LeavetableComponent } from './dashboard/leavetable/leavetable.component';
import { HolidayComponent } from './dashboard/holiday/holiday.component';
import { AdminLeaveRequestComponent } from './dashboard/admin-leave-request/admin-leave-request.component';
import { UserLeaveRequestComponent } from './dashboard/user-leave-request/user-leave-request.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: '', component: LockComponent},
  {path: 'register', component: RegisterComponent},
  { path:'forgot-password',component:ForgotPasswordComponent},
  { path:'reset/:id',component:ResetPasswordComponent},
  // {path: 'dashboard', component: RootComponent, children: [
  //   {path :'',component:UserLeaveRequestComponent},
  //   {path: 'users', component: TableComponent},
  //   {path: 'profile', component: ProfileComponent},
  //   {path: 'home', component: HomeComponent},
  //   {path: 'holiday',component:HolidayComponent},
  //   {path:'leavetable' , component:LeavetableComponent},
  //   {path: 'AdminRequest',component:AdminLeaveRequestComponent},
  //   {path :'UserRequest',component:UserLeaveRequestComponent},
  //   {path: 'notification', component: NotificationComponent},
  //   {path: 'alert', component: SweetAlertComponent},
  //   {path: 'settings', component: SettingsComponent},
  //   {path: 'components/price-table', component: PriceTableComponent},
  //   {path: 'components/panels', component: PanelsComponent},
  //   {path: 'components/wizard', component: WizardComponent}
  // ],canActivate: [GuardService] }


  {path: 'dashboard', component: RootComponent, children: [
    // {path: '', component: HomeComponent},
    {path: '', component: ProfileComponent},
    { path:'UserRequest',component:UserLeaveRequestComponent},
    {path: 'table', component: TableComponent},
    {path: 'notification', component: NotificationComponent},
    {path: 'alert', component: SweetAlertComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'components/price-table', component: PriceTableComponent},
    {path: 'components/panels', component: PanelsComponent},
    {path: 'components/wizard', component: WizardComponent},
    {path:'leavetable' , component:LeavetableComponent},
    {path: 'AdminRequest',component:AdminLeaveRequestComponent},
    {path :'UserRequest',component:UserLeaveRequestComponent},
    {path: 'holiday',component:HolidayComponent},

  ]}
];

export const routing = RouterModule.forRoot(routes);

