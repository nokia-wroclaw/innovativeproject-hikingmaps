import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username = '';
  public email = '';
  public password = '';

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  handleSubmit() {
    this.userService.addUser(this.username, this.email, this.password)
      .subscribe(() => {
        // send message about succes and reroute
        this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'User created succesfully' });
      }, (error) => {
        // send message about error
        this.messageService.add({ severity: 'error', summary: 'Error',
          detail: (error.error.message) ? error.error.message : error.statusText });
      });
  }

}
