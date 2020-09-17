import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false})
  nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false})
  amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(event: Event) {
    event.preventDefault();
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = +(this.amountInputRef.nativeElement as HTMLInputElement).value;
    this.shoppingListService.addIngredient(ingredientName, ingredientAmount);
  }

}
