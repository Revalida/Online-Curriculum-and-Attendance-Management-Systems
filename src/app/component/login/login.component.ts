import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserCartService } from 'src/app/service/userCart.service';

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
  constructor(private formbuilder: FormBuilder, private http: HttpClient,
    private router: Router, public authService: AuthService,
    private userCartService: UserCartService) { }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
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
            this.loginForm.reset();
            this.router.navigate(['admin-dashboard'])
            console.log(user.role)
        }else if(user && user.role === 'user'){
          this.loginForm.reset();
          console.log(user.role)
          this.userCartService.loadUserCart(cartName, cartPassword),
          localStorage.setItem('token', cartPassword+cartName)
          this.router.navigate(['product'])
        } 
        else{
          alert("User not found!")
          console.log(user.role)
        }
      }, err => {
        alert("Something went wrong!")
        this.loading = false;
      })
  }
}
