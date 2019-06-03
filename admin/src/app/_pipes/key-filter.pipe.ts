import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'keyFilter'
})
export class KeyFilterPipe implements PipeTransform {

  transform(array: any, searchTerm: any): any {
    if (!array || !searchTerm) {
      return array;
    }


    return array.filter(product =>
      product.key.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
