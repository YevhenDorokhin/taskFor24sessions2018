import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaDevicesService {
  
  constructor () {}

  initCamera (video, config?) {
    navigator.mediaDevices.getUserMedia(config !== undefined ? config : {video: true, audio: true}).then(stream => {
      video.srcObject = stream;
      video.play();
    }).catch(err => {
      alert(`${err.name}: ${err.message}`);
    });
  }

  initOutputDevice (deviceId, video) {
    video.setSinkId('default').then(() => {
      video.setSinkId(deviceId);
    });
  }
  
}
