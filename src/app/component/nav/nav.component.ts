import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { UserCartService } from 'src/app/service/userCart.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public searchTerm: string = "";
  public username : string = "";
  userOption: string[] = [];



  constructor(private cartService: CartService, public authService: AuthService, 
    private router: Router, private userCartService: UserCartService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserName();
  }

  search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value; 
    this.cartService.search.next(this.searchTerm)
  }

  clear(){
    this.searchTerm = "";
  }

  logout() {   
    this.cartService.updateStockAndItemSale();                      
    this.router.navigate(['/product']);
    localStorage.clear();

  }
  getUserName(){
    this.userCartService.getUserCart().subscribe((data:any) => {
      this.username = data.username
    })
  }

  getUserName(){
    this.userCartService.getUserCart().subscribe((data:any) => {
      this.username = data.username
      console.log(data.password)
    })
  }

  
}