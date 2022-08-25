import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  visible: boolean = true;
  changetype: boolean = true;
  submitted:boolean = false;
  loading = false;

  loginForm !: FormGroup;
  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  viewpass() {
    this.visible != this.visible;
    this.changetype != this.changetype;
  }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }
  get f() { return this.loginForm.controls; }


  login() {
    this.http.get<any>("http://localhost:3000/post" && "http://localhost:3000/user")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.username === this.loginForm.value.username &&
            a.password === this.loginForm.value.password
        });
        if (user && user.role == 'admin') {
            this.loginForm.reset();
            this.router.navigate(['admin-dashboard'])
        }else if(user && user.role == 'user'){
          this.loginForm.reset();
          this.router.navigate(['product'])
        } 
        else{
          alert("User not found!")
        }
      }, err => {
        alert("Something went wrong!")
        this.loading = false;
      })
  }
}
