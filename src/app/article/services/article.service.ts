import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private readonly _http: HttpClient) { }

  public deleteArticle(slug: string): Observable<{}> {
    const url: string = `${environment.apiUrl}/articles/${slug};`

    return this._http.delete<{}>(url);
  }
}