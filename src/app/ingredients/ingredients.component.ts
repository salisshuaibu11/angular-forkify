import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from "../services/shopping-list.service";

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients = [{
    id: 'ed32d0f0-5f7e-43a1-86c5-23b73ee6e5da',
    count: 4.5,
    unit: 'cup',
    ingredient: 'unbleached high-gluten, bread, or all-purpose flour, chilled'
  }]
  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit(): void {
    this.shoppingListService.ingredients.subscribe((ingredients: any) => this.ingredients = ingredients)
  }

  deleteIngredient(id: string) {
    this.shoppingListService.deleteIngredient(id);
  }

}
