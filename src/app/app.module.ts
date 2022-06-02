import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { RecipeListsComponent } from './recipe-lists/recipe-lists.component';
import { RecipeComponent } from './recipe/recipe.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { SpinnerComponent } from './ui/spinner/spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    RecipeListsComponent,
    RecipeComponent,
    IngredientsComponent,
    SearchBarComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
