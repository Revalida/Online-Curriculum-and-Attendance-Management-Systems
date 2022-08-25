import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  
  constructor(private http : HttpClient, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getUniqueProducts()
    .subscribe((data:any) => {
      console.log(data)
      this.products = data;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  placeOrder(){
    console.log("Order")
  }

  save(){
    this.visibility = false;
  }
}