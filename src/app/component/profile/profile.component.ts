import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserCartService } from 'src/app/service/userCart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName: string = "";
  passWord: string = "";
  firstName: string = "";
  middleName: string = "";
  lastName: string ="";
  eMail: string = "";
  mobile: string = "";
  
  constructor(private auth: AuthService,private userCart:UserCartService,
    private router: Router, private userCartService: UserCartService) { }

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(){
    this.userCartService.getUserDetails().subscribe((data:any) => {
      console.log(data)
      this.userName = data.username
      this.passWord = data.password
      this.firstName = data.firstname
      this.middleName = data.middlename
      this.lastName = data.lastname
      this.eMail = data.email
      this.mobile = data.mobilenumber
    })
  }
}
