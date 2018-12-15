import { Component, OnInit } from '@angular/core';
import { RouteService } from '../route.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  public points = '';


  constructor(
    private routeService: RouteService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  handleSubmit() {

    this.routeService.addRoute( this.points )
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Route added succesfully' });
        this.router.navigate(['/browse']);
        // send message about succes and reroute
      }, (error) => {
        // send message about error
        this.messageService.add({ severity: 'error', summary: 'Error',
          detail: (error.error.message) ? error.error.message : error.statusText });
      });
  }

}
