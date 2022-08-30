import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { UserCartService } from 'src/app/service/userCart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public totalItem : any;
  public searchTerm: string = "";

  constructor(private cartService: CartService, private router: Router, 
    public authService: AuthService, private userCartService: UserCartService) { }

  ngOnInit(): void {
    this.setCartDetails();
    this.cartService.getTotalCount().subscribe(data => {
      this.totalItem = data;
    });
  }

  search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value; 
    this.cartService.search.next(this.searchTerm)
  }

  clear(){
    this.searchTerm = "";
  }

  setCartDetails(){
    this.userCartService.getUserCartQuantity().subscribe((data:any) => {
      this.totalItem = data
    })
  }
}
