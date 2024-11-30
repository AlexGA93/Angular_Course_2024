import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  public heroName : string = "Ironman";
  public civilName: string = "Tonny Stark";
  public age      : number = 50;

  // function as property
  get capitalizedName(): string {
    return this.heroName.toUpperCase();
  }

  // this function is private, so it cannot be used outside THIS class (HeroComponent) 
  // html template is outside this class because is named in the decorator
  private getHeroDescription(): string {
    return `${this.heroName}(${this.civilName}) - ${this.age}`;
  }

  // public function using a private function can be used outside this class
  public callHeroDescription(): string {
    return this.getHeroDescription();
  }

  // public functions to change information by buttons
  public changeName(): void {
    this.heroName = "Spiderman";
    this.civilName = "Peter Parker";
  }

  public changeAge(): void {
    this.age = 28;
  }

  public checkName(): boolean {
    return this.heroName !== "Spiderman";
  }

  public checkAge(): boolean {
    return this.age !== 28;
  }
}
