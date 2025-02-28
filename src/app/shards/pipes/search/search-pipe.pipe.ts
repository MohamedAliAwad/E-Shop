import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(searchArr: any[], text:string): any {
    return searchArr.filter((item)=> item.title.toLowerCase().includes(text.toLowerCase()));
}


}
