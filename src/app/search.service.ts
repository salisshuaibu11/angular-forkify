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
  recipes$ = this.results$.asObservable();

  public isLoading = false;

  getResult(query: string) {
    return this.http.get<Results>(`https://forkify-api.herokuapp.com/api/search?q=${query}`).subscribe((data) => {
      this.results$.next(data);
    });
  }

  getRecipes(recipes: Recipes | {}) {
    return {
      recipes,
    };
  }
}
