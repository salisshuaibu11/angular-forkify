import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Results } from '../models/Search';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
  constructor(
    private searchService: SearchService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(recipe: HTMLInputElement) {
    const { value } = recipe;

    this.searchService.getResult(value);

    recipe.value = ""
    return false;
  }
}
