import { Component, OnInit } from '@angular/core';

import {
  ShoppingListService,
  RecipeService,
  LikesService
} from '../services';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  isLoading = false;
  recipe: any;
  isOnline: boolean = navigator.onLine;

  constructor(
    private recipeService: RecipeService,
    private likesService: LikesService,
  ) {
    this.recipe = this.recipeService.recipe$.subscribe((recipe) => recipe.recipe);
  }

  ngOnInit(): void {
    this.recipeService.recipe$.subscribe((recipe) => this.recipe = recipe.recipe);

    this.recipeService.loading$.subscribe((loading) => this.isLoading = loading);
  }

  updateServing(type: string) {
    this.recipeService.updateServings(type)
  };

  addLike(recipe: any) {
    const {recipe_id, title, publisher, image_url} = recipe;

    const like = {recipe_id, title, publisher, image_url}

    this.likesService.addLike(like)
  }

  addToShoppingList() {
    this.recipeService.addToShoppingList();
  }

}
