import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  
  constructor(private formbuilder : FormBuilder, private http : HttpClient,
    private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      username : [''],
      password : [''],
      firstname : [''],
      middlename : [''],
      lastname : [''],
      email : [''],
      mobilenumber : [''],
      role : ['user'],
    }) 
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/post" , this.signupForm.value)
    .subscribe(res=>{
      alert("Registration success!")
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("Something went wrong!")
    })
  }

}
