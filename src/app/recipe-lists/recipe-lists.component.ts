import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Recipes } from '../models/Search';
import { SearchService } from '../search.service';

import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-lists',
  templateUrl: './recipe-lists.component.html',
  styleUrls: ['./recipe-lists.component.css']
})
export class RecipeListsComponent implements OnInit {
  isLoading = false;
  recipes: Recipes[] = [];
  page: any;
  maxSize: number = 9;

  constructor(
    private searchService: SearchService,
    private recipeService: RecipeService
  ) {
  }

  ngOnInit(): void {
    this.searchService.recipes$.subscribe((data) => {
      this.recipes = data.recipes
    });

    this.searchService.loading$.subscribe((loading) => this.isLoading = loading)
  }

  fetchRecipe(recipeId: number) {

    this.recipeService.getRecipe(recipeId);

    this.recipeService.calcTime();

    return false;
  }
}
