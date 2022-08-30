import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricefilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(value: any[], args: any[]): any[] {
    var result: any = [];
    const propertyName: string = "price";
    const min : number = args[0];
    const max : number = args[1];
 
    if(!value || min === null || min < 0 || max === null || max <= 0){
      return value;
    }
    value.forEach((a:any) => {
      if(a[propertyName] >= min && a[propertyName]<=max){
        result.push(a);
      }
    })
    return result;
  }
}
