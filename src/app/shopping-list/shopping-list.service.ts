import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredientsList: Ingredient[] = [];
  // Since the get method only return a coppy of the list, we need an event emmiter to track changes.
  ingredientsAdded = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  constructor() {}

  addIngredient(name: string, amount: number) {
    this.ingredientsList.push(new Ingredient(name, amount));
    this.ingredientsAdded.next(this.ingredientsList.slice());
  }

  addIngredientsList(ingredients: Ingredient[]) {
    this.ingredientsList.push(...ingredients);
    this.ingredientsAdded.next(this.ingredientsList.slice());
  }

  getIngredient(index: number) {
    return this.ingredientsList[index];
  }

  getIngredientsList() {
    // Return a coppy of the list instead of the actual list
    return this.ingredientsList.slice();
  }

  upgradeIngredient(index: number, newIngredient: Ingredient) {
    this.ingredientsList[index] = newIngredient;
    this.ingredientsAdded.next(this.ingredientsList.slice());
  }

  deleteIngredient(index: number) {
    this.ingredientsList.splice(index, 1);
    this.ingredientsAdded.next(this.ingredientsList.slice());
  }
}
