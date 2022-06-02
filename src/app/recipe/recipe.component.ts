import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  isLoading = false;
  recipe: any;

  constructor(
    private recipeService: RecipeService
  ) {
    this.recipe = this.recipeService.recipe$.subscribe((recipe) => recipe.recipe);
  }

  ngOnInit(): void {
    this.recipeService.recipe$.subscribe((recipe) => this.recipe = recipe.recipe);

    this.recipeService.loading$.subscribe((loading) => this.isLoading = loading);
  }

}
