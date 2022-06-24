import { Injectable } from '@angular/core';
import { Like, Likes } from '../likes';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  public like$ = new BehaviorSubject<Like>({
    recipe_id: 35477,
    title: "Pizza Dip",
    publisher: "Closet Cooking",
    image_url: "http://forkify-api.herokuapp.com/images/Pizza2BDip2B12B500c4c0a26c.jpg"
  });

  public likes: any = []
  constructor() { }

  addLike({recipe_id, title, publisher, image_url}: Like) {
    const like = {recipe_id, title, publisher, image_url}

    this.like$.next(like);

    this.likes.push(like)
  };
}
