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
  
  fullname: string = "";
  mobile: string = "";
  address: string = "";
  visibility: boolean = true;
  public products: any = [];
  public grandTotal : number = 0;
  
  constructor(private auth: AuthService,private userCart:UserCartService,
    private router: Router) { }

  ngOnInit(): void {
    this.city = this.auth.city();
    this.setCartDetails();
  }
  city:any=[];
  barangay:any=[];

  onSelect(city: any) {
    // console.log(city.target.value)
    this.barangay = this.auth.barangay().filter(e => e.id == city.target.value);
    console.log(this.barangay);
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
}