import { Component } from '@angular/core';

@Component({
  selector: 'app-your-feed',
  template: `
    <div class="home-page">
  <app-banner></app-banner>
  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <app-feed-toggler></app-feed-toggler>
        <app-feed [apiUrl]="'/articles/feed'"></app-feed>
      </div>
      <div class="col-md-3">
        <app-popular-tags></app-popular-tags>
      </div>
    </div>
  </div>
</div>
  `
})
export class YourFeedComponent {
  constructor() { }
}
