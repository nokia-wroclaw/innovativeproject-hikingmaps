import { Component, OnInit } from '@angular/core';
import { AnnouncementService} from '../announcement.service';
import { Announcement } from '../announcement';
import {MenuItem, MessageService} from 'primeng/api';
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

  displayTypes: SelectItem[];

  selectedType: string;

  constructor(
    private announcementService: AnnouncementService,
    private messageService: MessageService,
    private router: Router
  ) { }


  ngOnInit() {
    this.getAllAnnouncements();
    this.displayTypes = [

      {label:'All', icon: 'pi pi-fw pi-question', value: { command: (onclick) => {this.getAllAnnouncements(); }}},
      {label:'Intresting', icon: 'pi pi-fw pi-question', value: { command: (onclick) => {this.getInterestingAnnouncements(); }}},
      {label:'My', icon: 'pi pi-fw pi-question', value: { command: (onclick) => {this.getMyAnnouncements(); }}},
    ];

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
  getAllAnnouncements() {
    this.announcements = [];
    this.announcementService.getAllAnnouncements()
      .subscribe( data => {
        this.announcements = data;
        //   this.convertDate();
      });
    this.convertDate();
  }

  getMyAnnouncements() {

    this.announcements = [];
    this.announcementService.getMyAnnouncements()
      .subscribe( data => {
        for (let i = 0; i < data.length; i++) {
            this.announcements.push(data[i].first);
        }
      });
    this.convertDate();
  }

  getInterestingAnnouncements() {
    this.announcements = [];
    this.announcementService.getInterestingAnnouncements()
      .subscribe( data => {
        for (let i = 0; i < data.length; i++) {
          this.announcements.push(data[i].first);
        }
      });
    this.convertDate();
  }

  convertDate() {
    const re = /(\d+)\-(\d+)\-(\d+)T(\d+):(\d+):(\d+)/;
    for (let i = 0; i < this.announcements.length; i++) {
      if (this.announcements[i].date != null) {
        const m = this.announcements[i].date.match(re);
        if (m) {
          const h = (parseInt(m[4], 10) + 1) % 24; // add 1 cause poland is in such timezone
          this.announcements[i].date = `${m[1]}/${m[2]}/${m[3]} ${h}:${m[5]}`;
        }
      }
    }
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
    this.announcementService.addInterest(announcemnt.id)
      .subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Announcement added succesfully' });
      this.router.navigate(['/browse']);
      // send message about succes and reroute
    }, (error) => {
      // send message about error
      this.messageService.add({ severity: 'error', summary: 'Error',
        detail: (error.error.message) ? error.error.message : error.statusText });
    });
  }

  onTypeChange(event){
    alert(event.value.command());
  }
}
