import { Component, OnInit } from '@angular/core';
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

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getUniqueProducts()
    .subscribe((data:any) => {
      this.products = data;
      console.log(this.products)
    });
    this.grandTotal = this.cartService.getTotalPrice();
  }

  removeItem(item: any){
    if(confirm('Are you sure you want to delete this item in your cart?')){
      this.cartService.removeCartItem(item);
      alert("Item deleted successfully");
      this.grandTotal = this.cartService.getTotalPrice();
    }else if (item.quantity === 0){
      item.quantity = 1;
      item.total = item.quantity * item.price;
      this.grandTotal = this.cartService.getTotalPrice();
    }
  }

  emptyCart(){
    if(confirm('Are you sure you want to delete all items in your cart?')){
      this.cartService.emptyCart();
      alert("All items in your cart deleted successfully");
      this.grandTotal = this.cartService.getTotalPrice();
    }
  }

  inc(item:any){
    this.cartService.addToCart(item)
    this.grandTotal = this.cartService.getTotalPrice();
  }

  dec(item:any){
    if(item.quantity === 1){
      this.removeItem(item)
    }else{
      this.cartService.minusToCart(item)
    }
    this.grandTotal = this.cartService.getTotalPrice();
  }

  updateQty(item : any){
    if(item.quantity<=0){
      this.removeItem(item);
    }else{
      this.cartService.uniqueItems.map((a: any, index:any) => {
        if(a.id === item.id){
          a.total = a.quantity * a.price;
        }
        this.grandTotal = this.cartService.getTotalPrice();
      })
    }
  }
}
