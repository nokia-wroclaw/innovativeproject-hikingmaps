import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {

  public title = '';
  public start = '';
  public dest = '';
  public date = '';
  public description = '';

  constructor(
    private announcementService: AnnouncementService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onDateChanged(args) {
    this.date = args.value;
  }

  handleAdd() {
    this.announcementService.addAnnouncement(this.title, this.start, this.dest, this.description, this.date)
      .subscribe(() => {
        this.router.navigate(['/browse']);
      }, () => {
      });
  }
}
