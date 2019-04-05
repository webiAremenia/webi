import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fullNameFilter'
})
export class FullNameFilterPipe implements PipeTransform {

  transform(array: any, searchTerm: any): any {
    if (!array || !searchTerm) {
      return array;
    }


    return array.filter(item =>
      item.fullName.en.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
