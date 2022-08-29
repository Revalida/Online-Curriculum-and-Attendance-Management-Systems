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
  submitted: boolean = false;
  loading = false;

  loginForm !: FormGroup;
  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  viewpass() {
    this.visible != this.visible;
    this.changetype != this.changetype;
  }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }



  login() {
    this.http.get<any>("http://localhost:3000/post")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.username === this.loginForm.value.username &&
            a.password === this.loginForm.value.password
        });
        if (user && user.role === 'admin') {
          if (user.status === 'activated') {
            this.loginForm.reset();
            this.router.navigate(['admin-dashboard'])
          } else {
            alert("User deactivated!")
            this.loginForm.reset();
          }
        } else if (user && user.role === 'user') {
          if (user.status === 'activated') {
            this.loginForm.reset();
            this.router.navigate(['product'])
          } else {
            alert("User deactivated!")
            this.loginForm.reset();
          }
        }
        else {
          alert("User not found!")
          this.loginForm.reset();
        }
      }, err => {
        alert("Something went wrong!")
        this.loading = false;
      })
  }
}
