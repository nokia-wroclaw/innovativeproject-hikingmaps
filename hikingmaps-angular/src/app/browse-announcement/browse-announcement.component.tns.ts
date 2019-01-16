import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { Announcement } from '../announcement';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-browse-announcement',
  templateUrl: './browse-announcement.component.html',
  styleUrls: ['./browse-announcement.component.css']
})
export class BrowseAnnouncementComponent implements OnInit {

  announcements: Announcement[];
  selectedAnnouncement: Announcement;

  displayDialog: boolean;


  sortKey: string;

  sortField: string;

  sortOrder: number;

  constructor(
    private announcementService: AnnouncementService,
    private router: Router
  ) { }


  ngOnInit() {
    this.announcementService.getAllAnnouncements()
      .subscribe(data => {
        this.announcements = data;
        for (let i = 0; i < this.announcements.length; i++) {
          if (this.announcements[i].date) {
            this.announcements[i].date = moment(this.announcements[i].date, 'YYYY-MM-DDTHH:mm:ssZ').format('DD-MM-YYYY HH:mm');
          }
        }
      });
  }

  handleAdd() {
    this.router.navigate(['/add']);
  }

  selectAsInterested(announcemnt: Announcement) {
    this.announcementService.addInterest(announcemnt.id)
      .subscribe(() => {
        this.router.navigate(['/browse']);
        // send message about succes and reroute
      }, (error) => {
        // send message about error
      });
  }
}
