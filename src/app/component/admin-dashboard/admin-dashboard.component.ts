import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './admin-dashboard.model';
import { ApiService } from '../../service/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  formValue !: FormGroup;
  dashboardObj: EmployeeModel = new EmployeeModel();
  userData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  showActivate !: boolean;
  showDeactivate: boolean = true;

  constructor(private formbuilder: FormBuilder,
    private api: ApiService, private http: HttpClient,
    private router: Router,) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      username: [''],
      password: [''],
      firstname: [''],
      middlename: [''],
      lastname: [''],
      email: [''],
      role: [''],
      status: ['']
    })
    this.getAllUser();
    this.checkStatus();
  }
  clickAddUser() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
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

  getAllUser() {
    this.api.getUser()
      .subscribe(res => {
        this.userData = res;
      })
  }

  activate() {
    this.showActivate = false;
    this.showDeactivate = true;
  }

  deactivate() {
    alert("Account has been deactivated!")
    this.showActivate = true;
    this.showDeactivate = false;
  }

  onEdit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.dashboardObj.id = data.id
    this.formValue.controls['firstname'].setValue(data.firstname)
    this.formValue.controls['middlename'].setValue(data.middlename)
    this.formValue.controls['lastname'].setValue(data.lastname)
    this.formValue.controls['email'].setValue(data.email)
  }

  updateUserDetails() {
    this.dashboardObj.email = this.formValue.value.email;
    this.dashboardObj.firstname = this.formValue.value.firstname;
    this.dashboardObj.username = this.formValue.value.username;
    this.dashboardObj.middlename = this.formValue.value.middlename;
    this.dashboardObj.lastname = this.formValue.value.lastname;
    this.dashboardObj.password = this.formValue.value.password;

    this.api.updateUser(this.dashboardObj, this.dashboardObj.id)
      .subscribe(res => {
        alert("Updated Successfully!")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      })
  }


  onUpdate(data: any) {
    this.dashboardObj.id = data.id
    this.dashboardObj.email = data.email;
    this.dashboardObj.firstname = data.firstname;
    this.dashboardObj.username = data.username;
    this.dashboardObj.middlename = data.middlename;
    this.dashboardObj.lastname = data.lastname;
    this.dashboardObj.password = data.password;
    this.dashboardObj.mobilenumber = data.mobilenumber;
  }

  updateUserStatus(){
    this.showActivate = true;
    this.showDeactivate = false;
    this.dashboardObj.status = "deactivated"
    this.api.updateUser(this.dashboardObj, this.dashboardObj.id)
      .subscribe(res => {
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      })
  }

  activateStatus(){
    this.showActivate = false;
    this.showDeactivate = true;
    this.dashboardObj.status = "activated"
    this.api.updateUser(this.dashboardObj, this.dashboardObj.id)
      .subscribe(res => {
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      })
  }

  checkStatus(){
    this.http.get<any>("http://localhost:3000/post")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.role === "activated"
        });
        if (user){
          this.showActivate = true;
          this.showDeactivate = false;
        }else{
          this.showActivate = false;
          this.showDeactivate = true;
        }
  }, err => {
    alert("Something went wrong!")
  })
}

}



