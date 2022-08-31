import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword !: FormGroup;
  password : string = '';
  @Output() actionEmitter = new EventEmitter<any>()

  constructor(private http: HttpClient, private router: Router, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.forgotPassword = this.formbuilder.group({
      username: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      mobilenumber: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    })
  }

  submit() {
    this.http.get<any>("http://localhost:3000/post")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.username === this.forgotPassword.value.username &&
            (a.email === this.forgotPassword.value.email && a.mobilenumber === this.forgotPassword.value.mobilenumber) 
        });
        if (user) {
            this.password = user.password
            alert( "Your password is " + this.password)
            this.forgotPassword.reset();
        }
        else{
          alert("Input is invalid")
        }
      }, err => {
        alert("Something went wrong!")
      })
  }
  sendAction(){
    this.actionEmitter.emit(this.password)
  }
}
