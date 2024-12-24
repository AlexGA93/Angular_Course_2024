import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../interfaces/hero.interface';

@Pipe({
  name: 'colorByPipe'
})
export class ColorByPipePipe implements PipeTransform {

  transform(value: Color): string {
    switch(value) {
      case 0:
        return "red";
      case 1:
        return "black";
      case 2:
        return "blue";
      case 3:
        return "green";

      default:
        return "";
    }
  }

}
