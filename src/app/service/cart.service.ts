import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserCartService } from './userCart.service';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public orderNumber = this.getCartFromLocalStoragecartTotalItem();
  public orderNumberSubject = new BehaviorSubject<number>(this.orderNumber);
  public search = new BehaviorSubject<string>("");
  public OrderProduct: any = {};


  constructor(private http: HttpClient, private userCartService: UserCartService,
    private apiService: ApiService) {}

  ngOnInIt(): void{
  }

  addToCart(product : any){
    console.log("product")
    console.log(product)
    product.stock--;
    product.totalItemSale++; 
    let status = "";
    let index = 0;
    this.userCartService.getUserCart().subscribe((data:any) => {
      let item = data;
      item.cartTotalQuantity = data.cartTotalQuantity + 1;
      item.grandTotal += product.price; 
      if(Object.keys(data.orders).length>0){  
        for(let a of data.orders){
          if(a.id === product.id){
            status = "existing";
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
        item.orders.splice(index,1, this.OrderProduct);
      }else{
        item.orders.push(this.OrderProduct);
      }
      this.apiService.updateUserCart(item, data.id);
      this.orderNumberSubject.next(item.cartTotalQuantity);
      
    })
    this.setCartToLocalStorage();
    // this.apiService.updateProducts(product.id, product);
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
    console.log("product")
    console.log(product)
    this.userCartService.getUserCart().subscribe((data:any) => {
      let item = data;
      for(let a of data.orders){
        if(a.id === product.id){
         item.grandTotal -= a.itemTotalPrice;
         this.OrderProduct = this.updateOrderProduct(a, -(a.itemQuantity)); 
         product.stock = product.stock + a.itemQuantity;
         product.totalItemSale = product.totalItemSale - a.itemQuantity; 
         item.cartTotalQuantity = data.cartTotalQuantity - a.itemQuantity;   
         item.orders.splice(item.orders.indexOf(a), 1);
        }
      }
      this.apiService.updateUserCart(item, data.id);
      this.orderNumberSubject.next(item.cartTotalQuantity);
    })
    this.setCartToLocalStorage();
    // this.apiService.updateProducts(product.id, product);
  }

  emptyCart(){
    this.userCartService.getUserCart().subscribe((data:any) => {
      data.orders.map((a:any) => {
      })
      data.orders = [];
      data.cartTotalQuantity = 0;
      data.grandTotal = 0; 
      this.apiService.updateUserCart(data, data.id);
      this.orderNumberSubject.next(data.cartTotalQuantity);
      this.setCartToLocalStorage();
    })
    // this.apiService.updateProducts(product.id, product);
  }

  minusToCart(product: any){
    console.log(product)
    product.stock++;
    product.totalItemSale--;
    this.userCartService.getUserCart().subscribe((data:any) => {
      let item = data;
      item.cartTotalQuantity = data.cartTotalQuantity - 1;
      item.grandTotal -= product.price; 
      data.orders.map((a: any) => {
        if(a.id === product.id){
          item.orders.itemQuantity = a.itemQuantity - 1;
          item.orders.itemTotalPrice = product.price*a.itemQuantity;
          this.OrderProduct = this.updateOrderProduct(a, -1);
          item.orders.splice(item.orders.indexOf(a),1, this.OrderProduct);
        }
      })
    this.apiService.updateUserCart(item, data.id);
    this.orderNumberSubject.next(item.cartTotalQuantity);
    })
    this.setCartToLocalStorage();
    // this.apiService.updateProducts(product.id, product);
  }

  getTotalCount(){
    return this.orderNumberSubject.asObservable();
  }

  setCartToLocalStorage(): void{
    this.userCartService.getUserCart().subscribe((data:any) => {
      const cartJson = JSON.stringify(data);
      localStorage.setItem('Cart', cartJson);
      const cartTotalItem = JSON.stringify(data.cartTotalQuantity);
      localStorage.setItem('CartTotalItem', cartTotalItem);
    })

  }
  getCartFromLocalStoragecartTotalItem(){
    const cartTotalItem = localStorage.getItem('CartTotalItem');
    return cartTotalItem? JSON.parse(cartTotalItem) : [];
  }

  // updateProductApi(id:number, product: any){
  //   this.apiService.updateProducts(id, product).subscribe((result) => {
  //   })
  // }
}