import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag-feed',
  template: `
    <div class="home-page">
      <app-banner></app-banner>
      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <app-feed-toggler [tagName]="tagName"></app-feed-toggler>
            <app-feed [apiUrl]="url"></app-feed>
          </div>
          <div class="col-md-3">
            <app-popular-tags></app-popular-tags>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TagFeedComponent {
  public tagName: string | null;
  public url: string;

  constructor(private readonly _route: ActivatedRoute) {
    this.tagName = this._route.snapshot.paramMap.get('slug');
    this.url = `/articles?tag=${this.tagName}`;
  }
}
