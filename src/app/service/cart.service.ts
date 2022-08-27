import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  public uniqueItems: any = this.getCartFromLocalStorage();;
  public uniqueProductList = new BehaviorSubject<any>([]);
  public orderNumber: number = 0;
  public orderNumberSubject = new BehaviorSubject<number>(this.orderNumber)

  constructor(private http: HttpClient) {
    // this.uniqueItems = this.getCartFromLocalStorage();
    // this.uniqueProductList.next(this.uniqueItems);
  }

  addToCart(product: any){
    console.log("product")
    console.log(product)
    console.log("uniqueItem")
    console.log(this.uniqueItems)
    this.orderNumber++
    product.stock--;
    product.totalItemSale++; 
    if(this.uniqueItems.includes(product)){
      console.log("includes")
      product.quantity++;
      product.total = product.price * product.quantity;    
    }else{
      this.uniqueItems.push(product);
      this.uniqueProductList.next(this.uniqueItems);
      this.http.post(`${environment.url}/cart`, {product});
    }
    console.log(this.uniqueItems)
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.orderNumberSubject.next(this.orderNumber);
    this.setCartToLocalStorage();
  }

  getUniqueProducts(){
    return this.uniqueProductList.asObservable();
  }

  setUniqueProducts(){

  }

  // getProducts(){
  //   return this.uniqueProductList.asObservable();
  // }

  getTotalPrice(): number{
    let grandTotal = 0;
    this.uniqueItems.map((a: any) => {
      grandTotal += a.price * a.quantity;
    })
    return grandTotal;
  }

  removeCartItem(product: any){
    this.orderNumber = this.orderNumber - product.quantity
    product.stock = product.stock + product.quantity;
    product.totalItemSale = product.totalItemSale - product.quantity; 
    this.uniqueItems.splice(this.uniqueItems.indexOf(product),1);
    this.uniqueProductList.next(this.uniqueItems);
    this.setCartToLocalStorage();
    console.log(this.uniqueItems)
    this.orderNumberSubject.next(this.orderNumber);
  }

  emptyCart(){
    let x = 0;
    while(this.uniqueItems.length>0){
      this.removeCartItem(this.uniqueItems[x])
    }
    console.log(this.uniqueItems)
    // this.uniqueItems = [];
    // this.uniqueProductList.next(this.uniqueItems);
    // this.setCartToLocalStorage();
  }

  minusToCart(product: any){
    this.uniqueItems.map((a: any, index:any) => {
      if(a.id === product.id){
        a.quantity = a.quantity - 1;
        a.total = a.price * a.quantity;
      }
    })
    this.orderNumber = this.orderNumber - 1;
    product.stock = product.stock + 1;
    product.totalItemSale = product.totalItemSale - 1; 
    this.uniqueProductList.next(this.uniqueItems);
    this.orderNumberSubject.next(this.orderNumber);
    this.setCartToLocalStorage();
  }

  private setCartToLocalStorage(): void{
    const cartJson = JSON.stringify(this.uniqueItems);
    localStorage.setItem('Cart', cartJson)
  }

  private getCartFromLocalStorage(): void{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson) : [];
  }

  // getCart(){
  //   return this.uniqueProductList.value;
  // }

  // getTotalCount(){
  //   let grandTotalCount = 0;
  //   this.uniqueItems.map((a: any) => {
  //     grandTotalCount += a.quantity;
  //     console.log(grandTotalCount)
  //   })
  //   return grandTotalCount;
  // }
  getTotalCount(){
    return this.orderNumberSubject.asObservable();
  }
}

