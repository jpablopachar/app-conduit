import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/Article';
import { ArticleInput } from 'src/app/shared/models/ArticleInput';
import { SaveArticleResponse } from 'src/app/shared/models/SaveArticleResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditArticleService {
  constructor(private readonly _http: HttpClient) {}

  public updateArticle(
    slug: string,
    articleInput: ArticleInput
  ): Observable<Article> {
    return this._http
      .put<SaveArticleResponse>(
        `${environment.apiUrl}/articles/${slug}`,
        articleInput
      )
      .pipe(map((res: SaveArticleResponse): Article => res.article));
  }
}
