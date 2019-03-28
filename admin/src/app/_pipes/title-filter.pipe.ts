import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'titleFilter'
})
export class TitleFilterPipe implements PipeTransform {

  transform(medias: any, searchTerm: string): any {
    if (!medias || !searchTerm) {
      return medias;
    }
    return medias.filter(media =>
      media.alt.en.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
