import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';

  constructor(
    private userService: UserService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
  }

  handleSubmit() {
    this.userService.loginUser(this.username, this.password)
      .subscribe(() => {
        // send message about succes and reroute
        this.messageService.add({severity: 'success', summary: 'Succes', detail: 'User logged in succesfully'});
      }, (error) => {
        // send message about error
        this.messageService.add({ severity: 'error', summary: 'Error',
          detail: (error.error.message) ? error.error.message : error.statusText });
      });
  }

}
