import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredientsList: Ingredient[] = [];
  // Since the get method only return a coppy of the list, we need an event emmiter to track changes.
  ingredientsAdded = new Subject<Ingredient[]>();

  constructor() { }

  addIngredient(name: string, amount: number) {
    this.ingredientsList.push(new Ingredient(name, amount));
  }

  addIngredientsList(ingredients: Ingredient[]) {
    this.ingredientsList.push(...ingredients);
    this.ingredientsAdded.next(this.ingredientsList.slice());
  }

  getIngredientsList() {
    // Return a coppy of the list instead of the actual list
    return this.ingredientsList.slice();
  }
}
