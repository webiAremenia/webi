import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleDescriptionFilter'
})
export class TitleDescriptionFilterPipe implements PipeTransform {

  transform(array: any, searchTerm: any): any {
    if (!array || !searchTerm) {
      return array;
    }


    return array.filter(item => (
      item.title.en.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ||  item.description.en.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ));
  }

}
