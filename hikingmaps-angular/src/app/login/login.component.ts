import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';

  constructor(
    private userService: UserService
    ) { }

  ngOnInit() {
  }

  handleSubmit() {
    this.userService.loginUser(this.username, this.password)
      .subscribe(() => {
        // send message about succes and reroute
      }, (error) => {
        // send message about error
        console.error(error);
      });
  }

}
