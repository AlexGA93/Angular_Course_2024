import { Component } from '@angular/core';

@Component({
  selector: 'products-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  constructor() {
    this.reset();
  }
  
  // i18nSelect
  public gender : 'male' | 'female' = 'male';
  public inviteMap: any = {'male': 'Invite him.', 'female': 'Invite her.', 'other': 'Invite them.'};

  public changeGender(): void {
    this.gender = 'female';
  }

  // i18nPlural
  public messages: any[] = ['Message 1'];
  public messageMapping: {[k: string]: string} = {
    '=0': 'No messages.',
    '=1': 'One message.',
    'other': '# messages.',
  };

  // slicePipe
  public collection: string[] = ['a', 'b', 'c', 'd'];

  // JsonPipe
  public object: Object = {foo: 'bar', baz: 'qux', nested: {xyz: 3, numbers: [1, 2, 3, 4, 5]}};

  // KeyValue
  public object2: {[key: number]: string} = {2: 'foo', 1: 'bar'};
  public map = new Map([ [2, 'foo'], [1, 'bar'] ]);

  // AsyncPipe
  public greeting: Promise<string> | null = null;
  public arrived: boolean = false;
  private resolve: Function | null = null;

  public reset(): void {
    this.arrived = false;
    this.greeting = new Promise<string>((resolve, reject) => {
      this.resolve = resolve;
    });
  }

  public clicked(): void {
    if (this.arrived) {
      this.reset();
    } else {
      this.resolve!('hi there!');
      this.arrived = true;
    }
  }

  
}
