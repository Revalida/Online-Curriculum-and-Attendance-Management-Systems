import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCartService } from 'src/app/service/userCart.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  
  constructor(private formbuilder : FormBuilder, private http : HttpClient,
    private router : Router, private userCartService: UserCartService) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      username : ['',Validators.required],
      password : ['',Validators.required],
      firstname : ['',Validators.required],
      middlename : ['',Validators.required],
      lastname : ['',Validators.required],
      email : ['',[Validators.required,Validators.email]],
      mobilenumber : ['',[Validators.required, Validators.pattern(/[0-9\+\-\ ]/)]],
      role : ['user'],
      status: ['activated'],
      birthdate : ['',Validators.required],
      interest : ['',Validators.required],
      address : ['',Validators.required],
    }) 
  }
  signUp(){
    const cartName = this.signupForm.value.username;
    const cartPassword = this.signupForm.value.password;
    this.http.post<any>("http://localhost:3000/post" , this.signupForm.value)
    .subscribe(res=>{
      this.userCartService.createCart(cartName, cartPassword);
      alert("Registration success!")
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("Something went wrong!")
    })
  }
}
