import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';

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
  public passwordConfirm = '';
  public goodConfirm = true;

  items: MenuItem[];

  // tslint:disable-next-line:max-line-length
  private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-fw pi-user',
        command: (onclick) => {this.router.navigate(['/login']); }
      }
    ];
  }

  handleSubmit() {
    if (!this.goodUsername || this.username === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Empty username' });
      return;
    } else if (!this.goodEmail || this.email === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad email' });
      return;
    } else if (!this.goodPassword || this.password === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password too short' });
      return;
    } else if (!this.goodConfirm || this.passwordConfirm === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Passwords do not match' });
      return;
    }
    this.userService.addUser(this.username, this.email, this.password)
      .subscribe(() => {
        // send message about success
        this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'User created succesfully' });
        this.userService.loginUser(this.username, this.password)
          .subscribe(() => {
            // send message about success and reroute
            this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'User logged in succesfully' });
            this.router.navigate(['/browse']);
          }, (error) => {
            // send message about error
            this.messageService.add({
              severity: 'error', summary: 'Error',
              detail: (error.error.message) ? error.error.message : error.statusText
            });
          });
      }, (error) => {
        // send message about error
        this.messageService.add({
          severity: 'error', summary: 'Error',
          detail: (error.error.message) ? error.error.message : error.statusText
        });
      });
  }

  valdateLogin() {
    this.goodUsername = this.username.length > 0;
  }

  valdateEmail() {
    this.goodEmail = this.emailRegex.test(this.email);
  }

  valdatePassword() {
    this.goodPassword = this.password.length >= 8;
  }

  valdateConfirm() {
    this.goodConfirm = this.passwordConfirm === this.password;
  }

}
