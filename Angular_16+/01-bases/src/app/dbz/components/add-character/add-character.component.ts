import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.scss'
})
export class AddCharacterComponent {

  @Output()
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();

  public character: Character = {
    name: '',
    power: 0
  };

  public emitCharacter(): void {
    // emit character data
    if (this.character.name.length === 0) return;

    this.onNewCharacter.emit(this.character);

    // reset character data
    this.character = {name: '', power:0 };
  }
}
