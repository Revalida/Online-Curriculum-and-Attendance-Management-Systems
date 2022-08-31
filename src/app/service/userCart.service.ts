import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {

  public userCartDetails: any = this.getCartFromLocalStorage();
  public userCartDetailsSubject = new BehaviorSubject<any>(this.userCartDetails)
  public userCartQuantity: any = this. getCartFromLocalStoragecartTotalItem();
  public userCartQuantitySubject = new BehaviorSubject<any>(this.userCartQuantity)
  public userDetails: any = this.getCartFromLocalStorage();
  public userDetailsSubject = new BehaviorSubject<any>(this.userDetails)

  constructor(private http: HttpClient) { 

  }

  createCart(username: string, password: string){
    let cartDetail = {
      id: 0,
      username: username,
      password: password,
      orders:[

      ],
      cartTotalQuantity: 0,
      grandTotal: 0,
    }
    this.http.post<any>(`${environment.url}/cart` , cartDetail).subscribe(res => {
      console.log(res)}, err=>{alert("Something went wrong!")
    });
  }

  loadUserCart(username:string, password: string){
    this.http.get<any>(`${environment.url}/cart`).subscribe(res => {
      for(let x of res){
        if(x.username === username && x.password === password){
          this.userCartDetails = {
            id: x.id,
            username: x.username,
            password: x.password,
            orders: x.orders,
            cartTotalQuantity: x.cartTotalQuantity,
            grandTotal: x.grandTotal
          }
          this.userCartDetailsSubject.next(this.userCartDetails);
          this.userCartQuantitySubject.next(this.userCartDetails.cartTotalQuantity);
          const cartJson = JSON.stringify(this.userCartDetails);
          localStorage.setItem('Cart', cartJson)
          const cartTotalItem = JSON.stringify(this.userCartDetails.cartTotalQuantity);
          localStorage.setItem('CartTotalItem', cartTotalItem)
        }
      }
    })
  }

  loadUserDetails(username:string, password: string){
    this.http.get<any>(`${environment.url}/post`).subscribe(res => {
      for(let x of res){
        if(x.username === username && x.password === password){
          this.userDetails = {
            id: x.id,
            username: x.username,
            password: x.password,
            firstname: x.firstname,
            middlename: x.middlename,
            lastname: x.lastname,
            email: x.email,
            mobilenumber: x.mobilenumber,
          }
          this.userDetailsSubject.next(this.userDetails);
        }
      }
    })
  }

  getUserCart(){
    return this.userCartDetailsSubject.asObservable();
  }

  getUserDetails(){
    return this.userDetailsSubject.asObservable();
  }

  getUserCartQuantity(){
    return this.userCartQuantitySubject.asObservable();
  }

  getCartFromLocalStorage(){
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson) : [];
  }

  getCartFromLocalStoragecartTotalItem(){
    const cartTotalItem = localStorage.getItem('CartTotalItem');
    return cartTotalItem? JSON.parse(cartTotalItem) : [];
  }
}