import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../recipe';

import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  time = 0;
  public loading$ = new BehaviorSubject(false);
  public recipe$ = new BehaviorSubject<Recipe>({
    recipe: {
      image_url: "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg",
      ingredients: [
        {count: 4.5, unit: 'cup', ingredient: 'unbleached high-gluten, bread, or all-purpose flour, chilled'},
        {count: 1, unit: '', ingredient: '3/4 tsps salt'}
      ],
      publisher: "101 Cookbooks",
      publisher_url: "http://www.101cookbooks.com",
      recipe_id: "47746",
      social_rank: 100,
      source_url: "http://www.101cookbooks.com/archives/001199.html",
      title: "Best Pizza Dough Ever",
      time: 10,
      servings: 4,
    }
  });

  constructor(
    private http: HttpClient,
    private shoppingListService: ShoppingListService
  ) { }

  getRecipe(recideId: number) {
    this.loading$.next(true);

    this.recipe$.next({recipe: {
      image_url: "",
      ingredients: [],
      publisher: "",
      publisher_url: "",
      recipe_id: "",
      social_rank: 100,
      source_url: "",
      title: "",
      time: 10,
      servings: 4,
    }})

    this.http.get<Recipe>(`https://forkify-api.herokuapp.com/api/get?rId=${recideId}`)
      .subscribe((recipe) => {
        this.recipe$.next(recipe)
        this.loading$.next(false);

        // Parse ingredients
        this.parseIngredients();

        // Calculate time and servings
        this.calcTime();
        this.calculateServings();
      })
  }

  calcTime() {
    const {recipe}: Recipe = this.recipe$.getValue();

    const numIngredients = recipe.ingredients.length;
    const periods = Math.ceil(numIngredients / 3) * 15;

    const newRecipe = {
      ...recipe,
      time: periods
    }

    // Set recipe to newly created recipe
    this.recipe$.next({recipe: newRecipe});
  };

  calculateServings() {
    const {recipe}: Recipe = this.recipe$.getValue();

    this.recipe$.next({recipe: {...recipe, servings: 4}})
  }

  updateServings(type: string) {
    const {recipe}: Recipe = this.recipe$.getValue();

    // Servings
    const newServings = type === 'dec' ? recipe.servings - 1 : recipe.servings + 1;

    // Ingredients
    recipe.ingredients.forEach(ing => {
        ing.count *= (newServings / recipe.servings);
    });

    this.recipe$.next({recipe: {...recipe, servings: newServings}})
  };

  parseIngredients() {
    const { recipe }: Recipe = this.recipe$.getValue();

    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];

    const newIngredients = recipe.ingredients.map(el => {
        // 1). Uniform units
        let ingredient = el.toLowerCase();
        unitsLong.forEach((unit, i) => {
            ingredient = ingredient.replace(unit, unitsShort[i]);
        });

        // 2). Remove parentheses
        ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

        // 3). Parse ingredients into count, unit and ingredient
        const arrIng = ingredient.split(' ');
        const unitIndex = arrIng.findIndex((el2: any) => units.includes(el2));

        let objIng;
        if (unitIndex > -1) {
            // There is a unit
            const arrCount = arrIng.slice(0, unitIndex);

            let count;
            if (arrCount.length === 1) {
                count = eval(arrIng[0].replace('-', '+'));
            } else {
                count = eval(arrIng.slice(0, unitIndex).join('+'));
            }

            objIng = {
                count,
                unit: arrIng[unitIndex],
                ingredient: arrIng.slice(unitIndex + 1).join(' ')
            };

        } else if (parseInt(arrIng[0], 10)) {
            // There is NO unit, but 1st element is number
            objIng = {
                count: parseInt(arrIng[0], 10),
                unit: '',
                ingredient: arrIng.slice(1).join(' ')
            }
        } else if (unitIndex === -1) {
            // There is NO unit and NO Number is 1st position
            objIng = {
                count: 1,
                unit: '',
                ingredient
            };
        }

        return objIng;
    });

     const newRecipe = {
      ...recipe,
      ingredients: newIngredients
    }

    // Set recipe to newly created recipe
    this.recipe$.next({recipe: newRecipe});
  };

  addToShoppingList() {
    const { recipe }: Recipe = this.recipe$.getValue();

    this.shoppingListService.clearIngredientState();

    recipe.ingredients.forEach(el => {
      this.shoppingListService.addIngredient(el?.count, el?.unit, el?.ingredient);
    });
  }
}
