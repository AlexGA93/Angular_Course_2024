import { Component } from '@angular/core';
import { Character } from '../../interfaces/characters.interface';
import { DbzService } from '../../services/dbz.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  constructor( private dbzService: DbzService ) {}

  // using getters and setters to use the private service data
  get characters(): Character[] {
    return [...this.dbzService.dbzCharacters];
  }

  public onDeleteCharacter(id: string): void {
    this.dbzService.deleteCharacterById(id);
  }

  public onNewCharacter(character: Character): void {
    this.dbzService.addNewCharacter(character);
  }
}
