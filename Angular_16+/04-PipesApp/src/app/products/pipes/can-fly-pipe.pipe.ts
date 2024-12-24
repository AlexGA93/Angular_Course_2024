import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFlyPipe'
})
export class CanFlyPipePipe implements PipeTransform {

  transform(value: boolean): 'It can fly'|'It cannot fly' {
    return value ? 'It can fly' : 'It cannot fly';
  }

}
