import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public totalItem : number = 0;
  public searchTerm: string = "";

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(data => {
      this.totalItem = data.length;
    });
  }

  search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value; 
    this.cartService.search.next(this.searchTerm)
  }

  clear(){
    this.searchTerm = "";
  }

}
