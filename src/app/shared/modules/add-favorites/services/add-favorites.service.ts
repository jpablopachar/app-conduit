import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/Article';
import { GetArticleResponse } from 'src/app/shared/models/GetArticleResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddFavoritesService {
  constructor(private readonly _http: HttpClient) { }

  public getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`
  }

  public getArticle(res: GetArticleResponse): Article {
    return res.article;
  }

  public addToFavorites(slug: string): Observable<Article> {
    const url: string = this.getUrl(slug);

    return this._http.post<GetArticleResponse>(url, {}).pipe(map(this.getArticle))
  }

  public removeFromFavorites(slug: string): Observable<Article> {
    const url: string = this.getUrl(slug);

    return this._http.delete<GetArticleResponse>(url).pipe(map(this.getArticle))
  }
}
