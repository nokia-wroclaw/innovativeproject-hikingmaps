import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {

  ngOnInit() {
  }

}
