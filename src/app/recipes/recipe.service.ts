import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super tasty Schitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG/1200px-Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('Potato', 1)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else can I say?',
      'https://bloximages.newyork1.vip.townnews.com/bakersfield.com/content/tncms/assets/v3/editorial/2/9d/29d1a8f0-0652-553e-8cb5-694be055db26/5ddec7bdbedbf.image.jpg?resize=1200%2C1499',
      [new Ingredient('Buns', 2), new Ingredient('Beef', 5)]
    ),
  ];

  recipeChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    // Return a copy of the array instead of the actual array
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredientsList(ingredients);
  }

  getRecipeByIndex(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
