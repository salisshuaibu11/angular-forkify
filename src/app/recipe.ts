export interface Recipe {
  recipe: RecipeObj
}

interface RecipeObj {
  image_url: string;
  ingredients: any[];
  publisher: string;
  publisher_url: string;
  recipe_id: string;
  social_rank: number;
  source_url: string;
  title: string;
  time?: number;
  servings: number;
}
