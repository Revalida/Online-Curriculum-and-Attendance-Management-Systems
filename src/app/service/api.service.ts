import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {  
  }

  getProducts() : Observable<any>{
    return this.http.get<any>(`${environment.url}/products`).pipe(map((data:any) => {
      return data;
    }))
  }

  postProduct(data : any){
    return this.http.post<any>("http://localhost:3000/products" , data)
    .pipe(map((res:any)=>{return res;}))
  }

  updateProduct(data : any , id : number){
    return this.http.put<any>("http://localhost:3000/products/"+id , data)
    .pipe(map((res:any)=>{return res}))
  }

  deleteProduct(id : number){
    return this.http.delete<any>("http://localhost:3000/products/"+id)
    .pipe(map((res:any)=>{return res}))
  }


  updateProducts(id : number, product : any) : Observable<any>{
    return this.http.put<any>(`${environment.url}/products/${id}`, product).pipe(map((data:any) => {
      return data;
    }))
  }

  updateUserCart(product: any, id: number){
    this.http.put<any>(`${environment.url}/cart/${id}` , product).subscribe(res => {
      console.log(res)}, err=>{alert("Something went wrong!")
    });
  }


  postUser(data : any){
    return this.http.post<any>("http://localhost:3000/post" , data)
    .pipe(map((res:any)=>{return res;}))
  }
  getUser(){
    return this.http.get<any>("http://localhost:3000/post")
    .pipe(map((res:any)=>res))
  }
  updateUser(data : any , id : number){
    return this.http.put<any>("http://localhost:3000/post/"+id , data)
    .pipe(map((res:any)=>{return res}))
  }
  getProfile(){
    return this.http.get<any>("http://localhost:3000/user")
    .pipe(map((res:any)=>res))
  }

  postProfile(data : any){
    return this.http.post<any>("http://localhost:3000/user" , data)
    .pipe(map((res:any)=>{return res;}))
  }

}
