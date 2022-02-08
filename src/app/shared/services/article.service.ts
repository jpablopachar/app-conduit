import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../models/Article';
import { GetArticleResponse } from '../models/GetArticleResponse';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private readonly http: HttpClient) {}

  public getArticle(slug: string): Observable<Article> {
    const url: string = `${environment.apiUrl}/articles/${slug}`;

    return this.http
      .get<GetArticleResponse>(url)
      .pipe(map((res: GetArticleResponse): Article => res.article));
  }
}