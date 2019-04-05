import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {


  transform(array: any, searchTerm: any): any {
    if (!array || !searchTerm) {
      return array;
    }


    return array.filter(product =>
      product.name.en.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
