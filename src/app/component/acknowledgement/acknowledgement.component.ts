import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.scss']
})
export class AcknowledgementComponent implements OnInit {

  password : string = '';
  constructor() { }

  ngOnInit(): void {
    
  }

  executeAction(password : string){
    this.password = password
    console.log(this.password)
  }

}
