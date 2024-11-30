import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Character } from '../interfaces/characters.interface';

@Injectable({
  providedIn: 'root'
})
export class DbzService {

  constructor() { }

  // object passed by reference (any change in the methods will change this object)
  public dbzCharacters: Character[] = [
    { id: uuid(), name: "Goku", power: 12000 },
    { id: uuid(), name: "Vegeta", power: 10000 },
    { id: uuid(), name: "Krillin", power: 9000 },
    { id: uuid(), name: "Gohan", power: 12500 },
  ];

  public addNewCharacter(character: Character): void {
    const newCharacter: Character = { id: uuid(), ...character }; 
    this.dbzCharacters.push(newCharacter);
  }

  public deleteCharacterById(id: string): void {
    this.dbzCharacters = this.dbzCharacters.filter((character) => character.id !== id);
  }
}
