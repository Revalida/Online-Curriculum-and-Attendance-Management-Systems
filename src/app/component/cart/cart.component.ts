import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { UserCartService } from 'src/app/service/userCart.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  image_url = "assets/images/cart";
  public products: any = [];
  public grandTotal : number = 0;

  constructor(private cartService: CartService,
    private apiService: ApiService, private userCart:UserCartService) { }

  ngOnInit(): void {
    
    this.setCartDetails();
  }

  removeItem(item: any){
    if(confirm('Are you sure you want to delete this item in your cart?')){
      this.cartService.removeCartItem(item);
    }else if (item.quantity === 0){
      item.quantity = 1;
      item.total = item.quantity * item.price;
    }
    this.setCartDetails();
  }

  emptyCart(){
    if(confirm('Are you sure you want to delete all items in your cart?')){
      this.cartService.emptyCart();
    }
    this.setCartDetails();
  }

  inc(item:any){
    this.cartService.addToCart(item);
    this.setCartDetails();
  }

  dec(item:any){
    if(item.itemQuantity === 1){
      this.removeItem(item);
    }else{
      this.cartService.minusToCart(item);
    }
    this.setCartDetails();
  }

  updateQty(item : any){
    if(item.itemQuantity<=0){
      this.removeItem(item);
    }else{
      this.userCart.getUserCart().subscribe((data:any) => {
        let x = data;
        x.cartTotalQuantity = 0;
        x.grandTotal = 0;
        data.orders.map((a:any) => {
          if(a.id === item.id){
            let cartOrder = a;
            cartOrder.itemTotalPrice = cartOrder.itemQuantity * cartOrder.price;
            x.orders.splice(x.orders.indexOf(a), 1, cartOrder);
          }
          x.cartTotalQuantity += a.itemQuantity;
          x.grandTotal += a.itemTotalPrice;
        })
      })
    this.setCartDetails();
  }
}

  setCartDetails(){
      this.userCart.getUserCart().subscribe((data:any) => {
      this.grandTotal = data.grandTotal;
      this.products = data;
    })
  }
}
