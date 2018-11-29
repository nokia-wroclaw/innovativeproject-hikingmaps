import { Component, OnInit } from '@angular/core';
import { AnnouncementService} from '../announcement.service';
import { Announcement } from '../announcement';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import {SelectItem} from 'primeng/api';


@Component({
  selector: 'app-browse-announcement',
  templateUrl: './browse-announcement.component.html',
  styleUrls: ['./browse-announcement.component.css']
})
export class BrowseAnnouncementComponent implements OnInit {

  announcements: Announcement[];
  items: MenuItem[];

  selectedAnnouncement: Announcement;

  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  constructor(
    private announcementService: AnnouncementService,
    private router: Router
  ) { }


  ngOnInit() {
    this.announcementService.getAnnouncements().subscribe(data => this.announcements = data);
    this.items = [
      {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        items: [
          {label: 'Login', icon: 'pi pi-fw pi-question', command: (onclick) => {this.router.navigate(['/login']); } },
          {label: 'Register', icon: 'pi pi-fw pi-question', command: (onclick) => {this.router.navigate(['/register']); } }
        ]
      },
      {
        label: 'Announcement',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Add', icon: 'pi pi-fw pi-plus', command: (onclick) => {this.router.navigate(['/add']); } },
        ]
      }
    ];

    this.sortOptions = [
      {label: 'Najnowsze', value: '!date'},
      {label: 'Najstarsze', value: 'date'}
    ];
  }

  selectAnnouncement(event: Event, announcement: Announcement) {
    this.selectedAnnouncement = announcement;
    this.displayDialog = true;
    event.preventDefault();
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onDialogHide() {
    this.selectedAnnouncement = null;
  }

  selectAsInterested(announcemnt: Announcement) {
    console.log(announcemnt);
    this.announcementService.addInterest(announcemnt);
  }
}
