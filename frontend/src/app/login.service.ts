import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  state = {
    auth: null
  }
  constructor() { }
  login(user) {
    this.state.auth = user;
  }
}
