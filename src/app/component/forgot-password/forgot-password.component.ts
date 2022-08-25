import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword !: FormGroup;

  constructor(private http: HttpClient, private router: Router, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.forgotPassword = this.formbuilder.group({
      username: [''],
      email: [''],
      mobilenumber: ['']
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/post" && "http://localhost:3000/user")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.username === this.forgotPassword.value.username &&
            a.email === this.forgotPassword.value.email && 
            a.mobilenumber === this.forgotPassword.value.mobilenumber
        });
        if(user){
          console.log(this.forgotPassword.value.username)
          console.log(user)
        }else{
          alert("Wrong input")
          console.log(user)
        }}, err => {
          alert("Something went wrong!")
        })
  }
}
