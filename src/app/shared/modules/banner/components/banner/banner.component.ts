import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
    <div class="banner">
      <div class="container">
        <h1>Medium clone</h1>
        <p>A place to share knowledge</p>
      </div>
    </div>
  `
})
export class BannerComponent {
  constructor() {}
}
