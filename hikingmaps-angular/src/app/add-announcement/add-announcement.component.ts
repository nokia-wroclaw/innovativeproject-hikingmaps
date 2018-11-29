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

  private id = '';
  public title = '';
  public description = '';
  public date = '';
  public start = '';
  public destination = '';


  constructor(
    private announcementService: AnnouncementService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  handleSubmit() {

    this.announcementService.addAnnouncement('12300432', this.title, this.start, this.destination, this.description, this.date)
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

}
