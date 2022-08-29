import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {

  public userCartDetails: any = {};
  public userCartDetailsSubject = new BehaviorSubject<any>(this.userCartDetails)

  constructor(private http: HttpClient) { }

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
        }
      }
    })
  }

  getUserCart(){
    this.userCartDetailsSubject.subscribe((value) => {
      console.log(value)
    })
    return this.userCartDetailsSubject.asObservable();
  }
}
