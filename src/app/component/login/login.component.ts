import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserCartService } from 'src/app/service/userCart.service';
import { EmployeeModel } from '../admin-dashboard/admin-dashboard.model';

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
  dashboardObj: EmployeeModel = new EmployeeModel();


  loginForm !: FormGroup;
  constructor(private formbuilder: FormBuilder, private http: HttpClient,
    private router: Router, public authService: AuthService,
    private userCartService: UserCartService,
    private apiservice : ApiService) { }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  

  login() {
    const cartName = this.loginForm.value.username;
    const cartPassword = this.loginForm.value.password;
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
            this.userCartService.loadUserCart(cartName, cartPassword),
            this.dashboardObj = user
            this.getProfile()
            console.log(this.dashboardObj)
            this.userCartService.loadUserDetails(cartName,cartPassword)
              localStorage.setItem('token', cartPassword + cartName)
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

  getProfile(){
    this.http.get<any>("http://localhost:3000/post")
    .subscribe(res=>{
  },err=>{
    alert("Something went wrong!")
  })
  }


}

