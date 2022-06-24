import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Results } from '../models/Search';
import { LikesService } from '../services/likes.service';
import { Like } from '../likes';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
  likes: any = [];

  constructor(
    private searchService: SearchService,
    private likesService: LikesService
  ) {
  }

  ngOnInit(): void {
    this.likesService.like$.subscribe(() => this.likes = this.likesService.likes);
  }

  onSubmit(recipe: HTMLInputElement) {
    const { value } = recipe;

    this.searchService.getResult(value);

    recipe.value = ""
    return false;
  }
}
