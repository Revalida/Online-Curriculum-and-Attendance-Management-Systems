import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserCartService } from './userCart.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  public orderNumberSubject = new BehaviorSubject<number>(0)
  public search = new BehaviorSubject<string>("");
  public OrderProduct: any = {}

  constructor(private http: HttpClient, private userCartService: UserCartService,
    private apiService: ApiService) {}

  ngOnInIt(): void{

  }

  addToCart(product : any){
    product.stock--;
    product.totalItemSale++; 
    let status = "";
    let index = 0;
    // let orderProduct: any;
    this.userCartService.getUserCart().subscribe((data:any) => {
      let item = data;
      item.cartTotalQuantity = data.cartTotalQuantity + 1;
      item.grandTotal += product.price; 
      if(Object.keys(data.orders).length>0){  
        for(let a of data.orders){
          if(a.id === product.id){
            status = "existing"
            this.OrderProduct = this.updateOrderProduct(a, 1);
            index = item.orders.indexOf(a);
            break;
          }else{
            status = "new";
            this.OrderProduct = this.addNewOrderProduct(product);
          }  
        }
      }else{
        this.OrderProduct = this.addNewOrderProduct(product);
        item.grandTotal = product.price;
      }

      if(status === "existing"){
        item.orders.splice(index,1, this.OrderProduct)
      }else{
        item.orders.push(this.OrderProduct)
      }
      
      this.apiService.updateUserCart(item, data.id)
      this.orderNumberSubject.next(item.cartTotalQuantity);
    })
    this.setCartToLocalStorage();
  }

  updateOrderProduct(product: any, factor: number){
    let orderProduct = {
      id: product.id,
      name: product.name,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      itemQuantity: product.itemQuantity + factor,
      itemTotalPrice: product.price * (product.itemQuantity + factor),
    }
    return orderProduct;
  }

  addNewOrderProduct(product: any){
    let orderProduct = {
      id: product.id,
      name: product.name,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      itemQuantity: 1,
      itemTotalPrice: product.price,
    }
    return orderProduct;
  }

  removeCartItem(product: any){
    this.userCartService.getUserCart().subscribe((data:any) => {
      let item = data;
      // let orderProduct: any;
      for(let a of data.orders){
        if(a.id === product.id){
         item.grandTotal -= a.itemTotalPrice;
         this.OrderProduct = this.updateOrderProduct(a, -(a.itemQuantity)); 
         product.stock = product.stock + a.itemQuantity;
         product.totalItemSale = product.totalItemSale - a.itemQuantity; 
         item.cartTotalQuantity = data.cartTotalQuantity - a.itemQuantity;   
         item.orders.splice(item.orders.indexOf(a), 1)
        }
      }
      this.apiService.updateUserCart(item, data.id)
      this.orderNumberSubject.next(item.cartTotalQuantity);
    })
    this.setCartToLocalStorage();
    // this.updateProductApi(product.productid, product)
  }

  emptyCart(){
    let productQuantity = 0;
    this.userCartService.getUserCart().subscribe((data:any) => {
      data.orders.map((a:any) => {
      })
      data.orders = [];
      data.cartTotalQuantity = 0;
      data.grandTotal = 0; 
      this.apiService.updateUserCart(data, data.id)
      this.orderNumberSubject.next(data.cartTotalQuantity);
      this.setCartToLocalStorage();
    })
  }

  minusToCart(product: any){
    product.stock++;
    product.totalItemSale--;
    // let orderProduct: any;
    this.userCartService.getUserCart().subscribe((data:any) => {
      let item = data;
      item.cartTotalQuantity = data.cartTotalQuantity - 1;
      item.grandTotal -= product.price; 
      data.orders.map((a: any) => {
        if(a.id === product.id){
          item.orders.itemQuantity = a.itemQuantity - 1;
          item.orders.itemTotalPrice = product.price*a.itemQuantity;
          this.OrderProduct = this.updateOrderProduct(a, -1);
          item.orders.splice(item.orders.indexOf(a),1, this.OrderProduct)
        }
      })
    this.apiService.updateUserCart(item, data.id)
    this.orderNumberSubject.next(item.cartTotalQuantity);
    })
    this.setCartToLocalStorage();
  }

  getTotalCount(){
    return this.orderNumberSubject.asObservable();
  }

  private setCartToLocalStorage(): void{
    // const cartJson = JSON.stringify(this.cartProducts);
    // localStorage.setItem('Cart', cartJson)
  }

  private getCartFromLocalStorage(): void{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson) : [];
  }
}

