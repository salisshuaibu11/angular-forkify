import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { Results, Recipes } from './models/Search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
    private http: HttpClient
  ) { }

  private results$ = new BehaviorSubject<Results>({count: 0, recipes: []})
  public loading$ = new BehaviorSubject(false);
  recipes$ = this.results$.asObservable();


  getResult(query: string) {
    this.loading$.next(true);

    // Clear the previous recipes
    this.results$.next({count: 0, recipes: []})

    return this.http.get<Results>(`https://forkify-api.herokuapp.com/api/search?q=${query}`).subscribe((data) => {
      this.results$.next(data);
      this.loading$.next(false)
    });
  }

  getRecipes(recipes: Recipes | {}) {
    return {
      recipes,
    };
  }
}
