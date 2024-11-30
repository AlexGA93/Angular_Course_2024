import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public listTitle    : string = "Avengers! ...assemble ";
  public avengers     : string[] = ["Ironman", "Hulk", "Thor", "Captain America", "Black Widow", "Hawkeye"];
  public deletedHero? : string;

  public deleteLastHero(): void {
    this.deletedHero = this.avengers.pop();
  }
}
