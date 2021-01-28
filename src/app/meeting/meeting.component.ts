import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaDevicesService } from '../media-devices.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {
  
  isMuteVideo: boolean = false;
  isMuteMicrophone: boolean = false;

  @ViewChild('videoStream') videoStream: any;  
  video: any;

  constructor (
    private svc: MediaDevicesService
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

  toggleVideoMute () {
    this.isMuteVideo ? this.video.play() : this.video.pause();
    this.isMuteVideo = !this.isMuteVideo;
  }

  toggleMicrophoneMute () {
    this.video.srcObject.getTracks().map(mircophone => {
      if (mircophone.kind == 'audio') mircophone.enabled = !mircophone.enabled;
    });
    this.isMuteMicrophone = !this.isMuteMicrophone;
  }

}
