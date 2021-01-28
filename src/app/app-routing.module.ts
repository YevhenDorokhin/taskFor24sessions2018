import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { SettingsComponent } from './settings/settings.component';
import { VerificationComponent } from './verification/verification.component';
import { MeetingComponent } from './meeting/meeting.component';

const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'verification', component: VerificationComponent},
  {path: 'meeting', component: MeetingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
