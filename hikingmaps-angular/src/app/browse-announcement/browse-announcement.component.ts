import { Component, OnInit } from '@angular/core';
import { AnnouncementService} from '../announcement.service';
import { Announcement } from '../announcement';
import {MenuItem, MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import {SelectItem} from 'primeng/api';
import * as Leaflet from 'leaflet';
import * as moment from 'moment';


@Component({
  selector: 'app-browse-announcement',
  templateUrl: './browse-announcement.component.html',
  styleUrls: ['./browse-announcement.component.css']
})
export class BrowseAnnouncementComponent implements OnInit {

  constructor(
    private announcementService: AnnouncementService,
    private messageService: MessageService,
    private router: Router
  ) { }

  announcements: Announcement[];

  items: MenuItem[];

  selectedAnnouncement: Announcement;

  displayDialogDetails: boolean;

  displayDialogOptions: boolean;

  displayDialogInterest: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  displayTypes: SelectItem[]; // All/Interested/My

  selectedType: string; // All/Interested/My

  usersSelectedToAccept: SelectItem[]; // selected usernames to accept

  displayNotAcceptedUsers: SelectItem[]; // display only those usernames, which are waiting for acceptance

  showInterested: boolean; // show interested button

  showOptions: boolean; // show optins button

  showConfirm: boolean; // show confirm button

  showStatus: boolean; // show acceptance status button (only show when accepted)

  displayMaps() {
    const map = Leaflet.map('mapid').setView([49.6563, 18.8902], 14);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  }

  ngOnInit() {
    this.getAllAnnouncements();

    this.displayTypes = [

      {label: 'All', icon: 'pi pi-fw pi-question', value: { command: (onclick) => {this.getAllAnnouncements(); }}},
      {label: 'Interesting', icon: 'pi pi-fw pi-question', value: { command: (onclick) => {this.getInterestingAnnouncements(); }}},
      {label: 'My', icon: 'pi pi-fw pi-question', value: { command: (onclick) => {this.getMyAnnouncements(); }}},
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
      {label: 'Recent', value: '!date'},
      {label: 'Oldest', value: 'date'}
    ];
  }
  getAllAnnouncements() {
    this.announcements = [];
    this.announcementService.getAllAnnouncements()
      .subscribe( data => {
        this.announcements = data;
        this.convertDate();
      });
    this.showInterested = true;
    this.showConfirm = false;
    this.showOptions = false;
    this.showStatus = false;
  }

  getMyAnnouncements() {

    this.announcements = [];
    this.announcementService.getMyAnnouncements()
      .subscribe( data => {
        for (let i = 0; i < data.length; i++) {
            this.announcements.push(data[i].first);
            this.announcements[this.announcements.length - 1].interested = data[i].second;
        }
        this.convertDate();
      });
    this.showInterested = false;
    this.showConfirm = true;
    this.showOptions = true;
    this.showStatus = false;
  }

  getInterestingAnnouncements() {
    this.announcements = [];
    this.announcementService.getInterestingAnnouncements()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          this.announcements.push(data[i].first);
          this.announcements[this.announcements.length - 1].status = data[i].second;
        }
        this.convertDate();
      });
    this.showInterested = false;
    this.showConfirm = false;
    this.showOptions = false;
    this.showStatus = true;
  }
  convertDate() {
    for (let i = 0; i < this.announcements.length; i++) {
      if (this.announcements[i].date) {
        this.announcements[i].date = moment(this.announcements[i].date, 'YYYY-MM-DDTHH:mm:ssZ').format('DD-MM-YYYY HH:mm');
      }
    }
  }

  selectAnnouncementForDetails(event: Event, announcement: Announcement) {
    this.selectedAnnouncement = announcement;
    this.displayDialogDetails = true;
    event.preventDefault();
  }

  selectAnnouncementForOptions(event: Event, announcement: Announcement) {
    this.selectedAnnouncement = announcement;
    this.displayDialogOptions = true;
    event.preventDefault();
  }

  selectAnnouncementForInterested(event: Event, announcement: Announcement) {
    this.displayNotAcceptedUsers = [];
    for (let i = 0; i < announcement.interested.length; i++) { // get only those, which are not already accepted
      if (!announcement.interested[i].second) {
        this.displayNotAcceptedUsers.push({label: announcement.interested[i].first, value: announcement.interested[i].first});
      }
    }
    this.selectedAnnouncement = announcement;
    this.displayDialogInterest = true;
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
      this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Iterested succesfully' });
      // send message about succes
    }, (error) => {
      // send message about error
      this.messageService.add({ severity: 'error', summary: 'Error',
        detail: (error.error.message) ? error.error.message : error.statusText });
    });
  }

  handleChanges() {
    const convDate = moment(this.selectedAnnouncement.date, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm:ssZ');
    console.log(convDate);
    this.announcementService.changeMyAnnouncement(this.selectedAnnouncement.id, this.selectedAnnouncement.title,
      this.selectedAnnouncement.start, this.selectedAnnouncement.destination, this.selectedAnnouncement.description,
      convDate)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Announcement changed succesfully' });
      }, (error) => {
        // send message about error
        this.messageService.add({ severity: 'error', summary: 'Error',
          detail: (error.error.message) ? error.error.message : error.statusText });
      });
    this.displayDialogOptions = false;
  }

  handleDelete() {
    this.announcementService.deleteMyAnnouncement( this.selectedAnnouncement.id)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Announcement deleted succesfully' });
        this.getMyAnnouncements();
        }, (error) => {
        // send message about error
        this.messageService.add({ severity: 'error', summary: 'Error',
          detail: (error.error.message) ? error.error.message : error.statusText });
      });
    this.displayDialogOptions = false;

  }

  handleConfirmInterest() {
    for (let i = 0; i < this.usersSelectedToAccept.length; i++) { // accept all selected users
      this.announcementService.confirmUser(this.usersSelectedToAccept[i].toString(), this.selectedAnnouncement.id)
        .subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Succes', detail: 'User accepted succesfully'});
          this.getMyAnnouncements();
          }, (error) => {
          // send message about error
          this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: (error.error.message) ? error.error.message : error.statusText
          });
        });
    }
    this.displayDialogInterest = false;
  }
}


