import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaDevicesService } from '../media-devices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  @ViewChild('videoStream') videoStream: any;  
  video: any;

  constructor (
    private svc: MediaDevicesService,
    private router: Router
  ) {}

  ngOnInit () {
    this.video = this.videoStream.nativeElement;
    let config = {
      audio: {deviceId: localStorage.getItem('isSelectedMicrophone') ? {exact: localStorage.getItem('isSelectedMicrophone')} : undefined},
      video: {deviceId: localStorage.getItem('isSelectedCamera') ? {exact: localStorage.getItem('isSelectedCamera')} : undefined}
    };
    this.svc.initCamera(this.video, config);
    this.svc.initOutputDevice(localStorage.getItem('isSelectedSpeaker') ? localStorage.getItem('isSelectedSpeaker') : 'default', this.video);
  }

  next () {
    this.router.navigateByUrl('/settings');
  }

}
