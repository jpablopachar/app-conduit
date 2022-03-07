import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../models/user-profile';
import { GetUserProfileResponse } from '../models/user-profile-response';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private readonly _http: HttpClient) {}

  public getUserProfile(slug: string | null): Observable<UserProfile> {
    return this._http
      .get<GetUserProfileResponse>(`${environment.apiUrl}/profiles/${slug}`)
      .pipe(map((res: GetUserProfileResponse): UserProfile => res.profile));
  }
}
