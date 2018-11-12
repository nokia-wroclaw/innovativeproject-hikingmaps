import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

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
    private userService: UserService
    ) { }

  ngOnInit() {
  }

  handleSubmit() {
    this.userService.addUser(this.username, this.email, this.password)
      .subscribe(()=>{
        // send message about succes and reroute
      }, (error)=>{
        // send message about error
        console.error(error);        
      });
  }

}
