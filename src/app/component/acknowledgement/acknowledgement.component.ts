import { Component, Input, OnInit } from '@angular/core';




@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.scss']
})
export class AcknowledgementComponent implements OnInit {

  constructor() { }
  @Input() password : string | undefined

  ngOnInit(): void {
    
  }

  executeAction(password : string){
    this.password = password
    console.log(this.password)
  }

}
