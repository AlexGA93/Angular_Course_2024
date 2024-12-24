import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooglePipe'
})
export class TooglePipePipe implements PipeTransform {

  transform(
    // value
    value: string,
    // arguments
    toUpper: boolean = false
   ): string {
    
    return toUpper ? value.toUpperCase() : value.toLowerCase();
  }

}
