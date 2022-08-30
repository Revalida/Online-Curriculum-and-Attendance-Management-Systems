import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { UserCartService } from 'src/app/service/userCart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public productList : any;
  searchKey: string = "";
  public filterByCategory: any;
  SortbyParam = '';
  SortDirection = 'asc';
  public filterByPriceList: any;
  min = 0;
  max = 0;
  firstName = "";
  
  constructor(private api: ApiService, private cartService: CartService, private authService: AuthService, 
    private router: Router, private userCartService: UserCartService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe(data => {
      this.productList = data;
      this.filterByCategory = data;
    });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })

    this.getUserName();
  }

  addToCart(item: any){
    if(this.authService.isLoggedIn()){
      this.cartService.addToCart(item);
    }else{
      this.router.navigate(['/login']);
    }
  }

  filter(category: string){
    this.filterByCategory = this.productList.filter((a:any) => {
      if(a.category == category || category == ""){
        return a;
      }
    })
  }

  onSortDirection(){
    if(this.SortDirection === 'desc'){
      this.SortDirection = 'asc';
    }else{
      this.SortDirection = 'desc';
    }
  }

  resetFilterByPrice(){
    this.min = 0;
    this.max = 0;
  }

  getUserName(){
    this.userCartService.getUserDetails().subscribe((data:any) => {
      console.log(data)
      this.firstName = data.firstname
      console.log(this.firstName)
    })
  }
}
