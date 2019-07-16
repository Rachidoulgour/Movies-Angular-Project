import { Component, OnInit } from '@angular/core';

import { LoginService} from '../login.service';





@Component({

  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user;
  password;
  error = '';

  constructor( private loginService:LoginService) { }

  ngOnInit() {
  }

  // login(e) {
  //   e.preventDefault(); 
  //   if (this.loginService.login(this.user, this.password)) {

  //     this.error  = '';
  //     this.user = '';
  //     this.password = '';
      
      
  //   } else {
  //     this.error = "We didn't recognise your username or password, please check and try again"
  //   }
  // }
}