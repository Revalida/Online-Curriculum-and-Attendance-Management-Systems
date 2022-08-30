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
  productObj: Product = new Product();
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

  postProductDetails() {
    this.productObj.name = this.formValue.value.name;
    this.productObj.title = this.formValue.value.title;
    this.productObj.price = this.formValue.value.price;
    this.productObj.description = this.formValue.value.description;
    this.productObj.category = this.formValue.value.category;
    this.productObj.image = this.formValue.value.image;
    

    this.api.postProduct(this.productObj)
      .subscribe((res: any) => {
        console.log(res);
        alert("Product added successfully!")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllProducts();
      }, err => {
        alert("Something went wrong!")
      });
  }

  deleteProduct(data: any) {
    this.api.deleteProduct(data.id)
      .subscribe(res => {
        alert("Product Deleted!")
        this.getAllProducts();
      })

  }

  onEdit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.productObj.id = data.id
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['title'].setValue(data.title)
    this.formValue.controls['price'].setValue(data.price)
    this.formValue.controls['description'].setValue(data.description)
    this.formValue.controls['category'].setValue(data.category)
    this.formValue.controls['image'].setValue(data.image)
  }

  updateProductDetails() {
    this.productObj.name = this.formValue.value.name;
    this.productObj.title = this.formValue.value.title;
    this.productObj.price = this.formValue.value.price;
    this.productObj.description = this.formValue.value.description;
    this.productObj.category = this.formValue.value.category;
    this.productObj.image = this.formValue.value.image;

    this.api.updateProduct(this.productObj, this.productObj.id)
      .subscribe(res => {
        alert("Updated Successfully!")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllProducts();
      })
  }

}
