export interface Likes {
  likes: Like[]
}

export interface Like {
  recipe_id: number;
  title: string;
  publisher: string;
  image_url: string;
}
