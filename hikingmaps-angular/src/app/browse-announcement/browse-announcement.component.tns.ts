import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { Announcement } from '../announcement';
import { Router } from '@angular/router';


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
    this.announcementService.getAnnouncements()
      .subscribe(data => {
        this.announcements = data;
        const re = /(\d+)\-(\d+)\-(\d+)T(\d+):(\d+):(\d+)/;
        for (let i = 0; i < this.announcements.length; i++) {
          if (this.announcements[i].date) {
            const m = this.announcements[i].date.match(re);
            if (m) {
              const h = (parseInt(m[4], 10) + 1) % 24; // add 1 cause poland is in such timezone
              this.announcements[i].date = `${m[1]}/${m[2]}/${m[3]} ${h}:${m[5]}`;
            } else {
              this.announcements[i].date = `Date parse error: ${this.announcements[i].date}`;
            }
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
