import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipes } from '../models/Search';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipe = {};

  constructor(
    private http: HttpClient
  ) { }

  getRecipe(recideId: number) {
    this.http.get(`https://forkify-api.herokuapp.com/api/get?rId=${recideId}`)
      .subscribe((recipe) => this.recipe = recipe)
  }

  Recipe() {
    return this.recipe;
  }
}
