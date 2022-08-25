import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  public uniqueItems: any = [];
  public uniqueProductList = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {

  }

  addToCart(product: any){
    if(this.cartItemList.includes(product)){
      console.log("includes")
      product.quantity++;
      product.total = product.price * product.quantity;   
    }else{
      console.log("unique")
      this.uniqueItems.push(product);
      this.uniqueProductList.next(this.uniqueItems);
      this.http.post(`${environment.url}/cart`, {product});
    }
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
  }

  getUniqueProducts(){
    return this.uniqueProductList.asObservable();
  }


  getProducts(){
    return this.uniqueProductList.asObservable();
  }

  getTotalPrice(): number{
    let grandTotal = 0;
    this.uniqueItems.map((a: any) => {
      grandTotal += a.price * a.quantity;
    })
    return grandTotal;
  }

  removeCartItem(product: any){
    this.uniqueItems.splice(this.uniqueItems.indexOf(product),1);
    this.uniqueProductList.next(this.uniqueItems);
  }

  emptyCart(){
    this.uniqueItems = [];
    this.uniqueProductList.next(this.uniqueItems);
  }

  minusToCart(product: any){
    this.uniqueItems.map((a: any, index:any) => {
      if(a.id === product.id){
        a.quantity = a.quantity - 1;
        a.total = a.price * a.quantity;
      }
    })
    console.log(this.uniqueItems)
    this.uniqueProductList.next(this.uniqueItems);
  }
}
