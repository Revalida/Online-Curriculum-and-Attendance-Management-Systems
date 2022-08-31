import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topFivefilter'
})
export class TopFivePipe implements PipeTransform {

  transform(value: any[], x: any): any[] {
    var result: any = [];
    const sortItem: string = "totalItemSale";
    let multiplier = -1;
 
    if(!value || x === null || x < 0){
      return value;
    }
    value.sort((a: any, b: any) => {
        if(a[sortItem] < b[sortItem]){
          return -1*multiplier;
        } else if (a[sortItem] > b[sortItem]){
          return 1*multiplier;
        } else {
          return 0;
        }
      });  

      for(let i=0; i<x; i++){
        result.push(value[x])
      }
      return result;
  }
}


