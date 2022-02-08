import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetPopularTagsResponse } from '../models/get-popular-tags-response';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  constructor(private readonly _http: HttpClient) {}

  public getPopularTags(): Observable<string[]> {
    return this._http
      .get<GetPopularTagsResponse>(`${environment.apiUrl}/tags`)
      .pipe(map((res: GetPopularTagsResponse): string[] => res.tags));
  }
}