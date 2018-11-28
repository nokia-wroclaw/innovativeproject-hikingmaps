import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username = '';
  public goodUsername = true;
  public email = '';
  public goodEmail = true;
  public password = '';
  public goodPassword = true;

  // tslint:disable-next-line:max-line-length
  private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  handleSubmit() {
    if (!this.goodUsername || this.username === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Empty username'});
      return;
    } else if (!this.goodEmail || this.email === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad email' });
      return;
    } else if (!this.goodPassword || this.password === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password too short' });
      return;
    }
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

  valdateLogin() {
    console.log(this.goodUsername);
    this.goodUsername = this.username.length > 0;
  }

  valdateEmail() {
    this.goodEmail = this.emailRegex.test(this.email);
  }

  valdatePassword() {
    this.goodPassword = this.password.length >= 8;
  }

}
