import { Component, Input } from '@angular/core';
import { PopularTag } from 'src/app/shared/models/PopularTag';

@Component({
  selector: 'app-tag-list',
  template: `
    <ul class="tag-list">
      <li *ngFor="let tag of tags" class="tag-default tag-pill tag-outline">
        {{ tag }}
      </li>
    </ul>
  `,
})
export class TagListComponent {
  @Input() tags!: PopularTag[];

  constructor() {}
}
