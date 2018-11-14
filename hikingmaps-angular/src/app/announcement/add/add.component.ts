import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../announcement.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public name = '';
  public description = '';
  public date = '';
  public start = '';
  public destination = '';


  constructor(
    private announcementService: AnnouncementService
    ) { }

  ngOnInit() {
  }

  handleSubmit() {

    this.announcementService.addAnnouncement(this.name, this.date, this.description, this.start, this.destination)
      .subscribe(() => {
        // send message about succes and reroute
      }, (error) => {
        // send message about error
        console.error(error);
      });
  }

}
