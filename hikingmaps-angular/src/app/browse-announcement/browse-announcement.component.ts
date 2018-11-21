import { Component, OnInit } from '@angular/core';
import { AnnouncementService} from '../announcement.service';
import { Announcement } from '../announcement';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-announcement',
  templateUrl: './browse-announcement.component.html',
  styleUrls: ['./browse-announcement.component.css']
})
export class BrowseAnnouncementComponent implements OnInit {

  announcements: Announcement[];
  items: MenuItem[];

  constructor(
    private announcementService: AnnouncementService,
    private router: Router
  ) { }


  ngOnInit() {
    this.announcements = this.announcementService.getAnnouncements();
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
  }

}
