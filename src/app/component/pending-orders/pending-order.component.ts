import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { UserCartService } from 'src/app/service/userCart.service';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.scss']
})
export class PendingOrderComponent implements OnInit {

  image_url = "assets/images/cart";
  public products: any = [];
  public grandTotal : number = 0;

  constructor(private userCart:UserCartService) { }

  ngOnInit(): void {
    this.setCartDetails()
  }

  setCartDetails(){
    this.userCart.getUserCart().subscribe((data:any) => {
      this.grandTotal = data.grandTotal;
      this.products = data.orders
    })
  }

}
