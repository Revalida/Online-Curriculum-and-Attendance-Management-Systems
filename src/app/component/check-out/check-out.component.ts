import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { UserCartService } from 'src/app/service/userCart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  firstName: string = "";
  middleName: string = "";
  lastName: string ="";
  fullname: string = "";
  mobile: string = "";
  houseStreet: string = "";
  city: string = "";
  barangay: string = "";
  visibility: boolean = true;
  public products: any = [];
  public grandTotal : number = 0;
  
  constructor(private auth: AuthService,private userCart:UserCartService,
    private router: Router, private userCartService: UserCartService) { }

  ngOnInit(): void {
    this.setCartDetails();
    this.getUserName();
  }

  placeOrder(){
    this.router.navigate(['/pendingpage']);
  }



  save(){
    this.visibility = false;
  }

  setCartDetails(){
    this.userCart.getUserCart().subscribe((data:any) => {
      this.grandTotal = data.grandTotal;
      this.products = data.orders
    })
  }

  getUserName(){
    this.userCartService.getUserDetails().subscribe((data:any) => {
      console.log(data)
      this.firstName = data.firstname
      this.middleName = data.middlename
      this.lastName = data.lastname
      this.mobile = data.mobilenumber
    })
  }
}