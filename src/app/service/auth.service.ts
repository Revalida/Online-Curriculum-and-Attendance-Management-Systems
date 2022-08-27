import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  data : boolean = false;
  constructor() {}

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }
}