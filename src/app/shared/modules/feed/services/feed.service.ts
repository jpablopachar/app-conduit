import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetFeedResponse } from '../models/GetFeedResponse';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(private readonly _http: HttpClient) { }

  public getFeed(url: string) : Observable<GetFeedResponse> {
    const fullUrl = environment.apiUrl + url;

    return this._http.get<GetFeedResponse>(fullUrl);
  }
}
