import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaDevicesService } from '../media-devices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @ViewChild('videoStream') videoStream: any;  
  video: any;

  cameraDevices: Array<{label: string, deviceId: string}> = [];
  microphoneDevices: Array<{label: string, deviceId: string}> = [];
  speakerDevices: Array<{label: string, deviceId: string}> = [];

  isSelectedCamera: any;
  isSelectedMicrophone: any;
  isSelectedSpeaker: any;

  constructor (
    private svc: MediaDevicesService,
    private router: Router
  ) {}

  ngOnInit () {
    this.video = this.videoStream.nativeElement;
    this.getDevicesList();
  }

  getDevicesList () {
    this.cameraDevices = [];
    this.microphoneDevices = [];
    this.speakerDevices = [];
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        devices.map(device => {
          let {kind, label, deviceId} = device;
          switch (kind) {
            case 'audioinput':
              this.microphoneDevices.push({label, deviceId});
              break;
            case 'videoinput':
              this.cameraDevices.push({label, deviceId});
              break;
            case 'audiooutput':
              this.speakerDevices.push({label, deviceId});
              break;
            default:
              break;
          }
        });
      }).then(() => {
        this.isSelectedCamera = localStorage.getItem('isSelectedCamera') || this.cameraDevices[0].deviceId;
        this.isSelectedMicrophone = localStorage.getItem('isSelectedMicrophone') || this.microphoneDevices[0].deviceId;
        this.isSelectedSpeaker = localStorage.getItem('isSelectedSpeaker') || this.speakerDevices[0].deviceId;
      }).then(() => {
        this.changeInputDevice();
        this.changeOutputDevice();
      }).catch(err => {
        alert(`${err.name}: ${err.message}`);
      });
  }

  changeInputDevice () {
    let config = {
      audio: {deviceId: this.isSelectedMicrophone ? {exact: this.isSelectedMicrophone} : undefined},
      video: {deviceId: this.isSelectedCamera ? {exact: this.isSelectedCamera} : undefined}
    };
    this.svc.initCamera(this.video, config);
    localStorage.setItem('isSelectedCamera', this.isSelectedCamera);
    localStorage.setItem('isSelectedMicrophone', this.isSelectedMicrophone);
  }

  changeOutputDevice () {
    this.svc.initOutputDevice(this.isSelectedSpeaker, this.video);
    localStorage.setItem('isSelectedSpeaker', this.isSelectedSpeaker);
  }
  
  next () {
    this.router.navigateByUrl('/meeting');
  }
}
