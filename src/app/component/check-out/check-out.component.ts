import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';

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
  
  constructor(private auth: AuthService, private http : HttpClient, private cartService: CartService) { }

  ngOnInit(): void {
    this.city = this.auth.city();
    this.cartService.getUniqueProducts()
    .subscribe((data:any) => {
      console.log(data)
      this.products = data;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }
  city:any=[];
  barangay:any=[];

  onSelect(city: any) {
    // console.log(city.target.value)
    this.barangay = this.auth.barangay().filter(e => e.id == city.target.value);
    console.log(this.barangay);
  }

  placeOrder(){
    console.log("Order")
  }

  save(){
    this.visibility = false;
  }
}