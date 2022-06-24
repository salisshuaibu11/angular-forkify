import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public ingredients: any = new BehaviorSubject([]);
  newIngredients: any = [];
  constructor() { }

  addIngredient(count: number, unit: string, ingredient: string) {
    const list = {
      id: uuidv4(),
      count,
      unit,
      ingredient
    }

    // Prepare the ingredients in an array
    this.newIngredients.push(list);

    // Add the ingredients array to the subject
    this.ingredients.next(this.newIngredients);
  }

  deleteIngredient(id:  string) {
    const newIngredients = this.newIngredients.filter((ing: any) => ing.id !== id);

    this.newIngredients = newIngredients;

    this.ingredients.next(this.newIngredients);
  }

  clearIngredientState() {
    this.newIngredients = [];
  }
}
