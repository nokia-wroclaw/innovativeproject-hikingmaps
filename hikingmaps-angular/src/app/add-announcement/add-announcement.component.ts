import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {

  public name = '';
  public description = '';
  public date = '';
  public start = '';
  public destination = '';


  constructor(
    private announcementService: AnnouncementService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  handleSubmit() {

    this.announcementService.addAnnouncement(this.name, this.date, this.description, this.start, this.destination)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Announcement added succesfully' });
        // send message about succes and reroute
      }, (error) => {
        // send message about error
        this.messageService.add({ severity: 'error', summary: 'Error',
          detail: (error.error.message) ? error.error.message : error.statusText });
      });
  }

}
