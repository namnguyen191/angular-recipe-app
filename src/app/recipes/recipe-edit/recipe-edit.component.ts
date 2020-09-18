import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    // IF NEW MODE THEN EVERYTHING IS EMPTY
    let recipeName = '';
    let recipeImgpath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    // IF EDIT MODE THEN POPULATE THE FORM
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeByIndex(this.id);
      recipeName = recipe.name;
      recipeImgpath = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImgpath, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.imagePath,
    //   this.recipeForm.value.ingredients
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

}
