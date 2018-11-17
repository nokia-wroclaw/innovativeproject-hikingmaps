import { Component, OnInit } from '@angular/core';
import { AnnouncementService} from '../announcement.service';
import { Announcement } from '../announcement';


@Component({
  selector: 'app-browse-announcement',
  templateUrl: './browse-announcement.component.html',
  styleUrls: ['./browse-announcement.component.css']
})
export class BrowseAnnouncementComponent implements OnInit {

  announcements: Announcement[];

  constructor(
    private announcementService: AnnouncementService,
  ) { }
  ngOnInit() {
    this.announcements = this.announcementService.getAnnouncements();
  }

}
