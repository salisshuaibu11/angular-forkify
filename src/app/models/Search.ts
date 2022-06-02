export interface Recipes {
  image_url: string;
  publisher: string;
  publisher_url: string;
  recipe_id: number;
  social_rank: number;
  source_rank: string;
  title: string;
}

export interface Results {
  count: number;
  recipes: Recipes[];
}
