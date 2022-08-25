import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './admin-dashboard.model';
import { ApiService } from '../../service/api.service';

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

  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      username: [''],
      password: [''],
      firstname: [''],
      middlename: [''],
      lastname: [''],
      email: [''],
      role: [''],
    })
    this.getAllUser();
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

  deleteUser(data: any) {
    this.api.deleteUser(data.id)
      .subscribe(res => {
        alert("Employee Deleted!")
        this.getAllUser();
      })

  }

  onEdit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.dashboardObj.id = data.id
    this.formValue.controls['username'].setValue(data.username)
    this.formValue.controls['password'].setValue(data.password)
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

}
