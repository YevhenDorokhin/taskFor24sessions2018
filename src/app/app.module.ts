import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { SettingsComponent } from './settings/settings.component';
import { VerificationComponent } from './verification/verification.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MediaDevicesService } from './media-devices.service';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    SettingsComponent,
    VerificationComponent,
    MeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [MediaDevicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
