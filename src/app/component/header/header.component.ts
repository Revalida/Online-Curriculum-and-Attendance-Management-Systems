import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public totalItem : number = 0;
  public searchTerm: string = "";

  constructor(private cartService: CartService, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    // this.cartService.getUniqueProducts().subscribe(data => {
    //   this.totalItem = data.length;
    // });
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

  // goToCart(){
  //   console.log("1")
  //   if(this.authService.isLoggedIn()){
  //     console.log("2")
  //     this.router.navigate(['/cart']);
  //   }else{
  //     console.log("3")
  //     this.router.navigate(['/login']);
  //   }
  // }
}
