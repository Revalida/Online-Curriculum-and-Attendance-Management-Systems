import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public totalItem : number = 0;
  public searchTerm: string = "";

  constructor(private cartService: CartService) { }

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