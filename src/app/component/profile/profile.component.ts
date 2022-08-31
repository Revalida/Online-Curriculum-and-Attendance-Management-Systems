import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { UserCartService } from 'src/app/service/userCart.service';
import { ProfileModel } from './profile.model';


import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formValue !: FormGroup;
  userData !: any;
  dashboardObj: ProfileModel = new ProfileModel();
  firstName !: string


  constructor(private formbuilder: FormBuilder,
    private api: ApiService, private http: HttpClient,
    private router: Router, private userCartService: UserCartService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      username: [''],
      password: [''],
      firstname: [''],
      middlename: [''],
      lastname: [''],
      email: [''],
      role: [''],
      status: [''],
      birthdate : Date,
      address : [''],
      listOfInterest : ['']
    })
    this.getUserName()
  }

  getUserName(){
    this.userCartService.getUserDetails().subscribe((data:any) => {
      console.log(data)
      this.firstName = data.firstname
      console.log(this.firstName)
    })
  }

  getAllUser() {
    this.api.getProfile()
      .subscribe(res => {
        this.userData = res;
      })
  }

  onEdit(data: any) {
    this.dashboardObj.id = data.id
    this.formValue.controls['firstname'].setValue(data.firstname)
    this.formValue.controls['middlename'].setValue(data.middlename)
    this.formValue.controls['lastname'].setValue(data.lastname)
    this.formValue.controls['email'].setValue(data.email)
    this.dashboardObj.username = data.username
    this.dashboardObj.password = data.password
    this.dashboardObj.mobilenumber = data.mobilenumber
  }

  updateUserDetails() {
    this.dashboardObj.email = this.formValue.value.email;
    this.dashboardObj.firstname = this.formValue.value.firstname;
    this.dashboardObj.middlename = this.formValue.value.middlename;
    this.dashboardObj.lastname = this.formValue.value.lastname;

    this.api.updateUser(this.dashboardObj, this.dashboardObj.id)
      .subscribe(res => {
        alert("Updated Successfully!")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      })
  }

  postUserDetails() {
    this.dashboardObj.email = this.formValue.value.email;
    this.dashboardObj.firstname = this.formValue.value.firstname;
    this.dashboardObj.username = this.formValue.value.username;
    this.dashboardObj.middlename = this.formValue.value.middlename;
    this.dashboardObj.lastname = this.formValue.value.lastname;
    this.dashboardObj.password = this.formValue.value.password;
    this.dashboardObj.role = 'user';

    this.api.postUser(this.dashboardObj)
      .subscribe((res: any) => {
        console.log(res);
        alert("Employee added successfully!")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      }, err => {
        alert("Something went wrong!")
      });
  }



