import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit {
  isConfirmPermissionBlock: boolean = true;
  
  constructor (private router: Router) {}

  confirm () {
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(() => {
      this.router.navigateByUrl('/verification');
    }).catch(err => {
      alert(`${err.name}: ${err.message}`);
    });
  }

  notConfirm () {
    this.isConfirmPermissionBlock = !this.isConfirmPermissionBlock;
  }

  ngOnInit () {}

}
