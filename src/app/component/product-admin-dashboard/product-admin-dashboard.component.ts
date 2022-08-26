import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Product } from './product-dashboard.model';

@Component({
  selector: 'app-product-admin-dashboard',
  templateUrl: './product-admin-dashboard.component.html',
  styleUrls: ['./product-admin-dashboard.component.scss']
})
export class ProductAdminDashboardComponent implements OnInit {
  formValue !: FormGroup;
  productdObj: Product = new Product();
  productData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
    name : [''],
    title : [''],
    price : [''],
    description : [''],
    category : [''],
    image : [''],
    })
    this.getAllProducts();
  }

  getAllProducts() {
    this.api.getProducts()
      .subscribe(res => {
        this.productData = res;
      })
  }

  clickAddProduct() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

}
