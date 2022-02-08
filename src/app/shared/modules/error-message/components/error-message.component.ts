import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `<div>{{ message }}</div>`
})
export class ErrorMessageComponent {
  @Input() message: string | null;

  constructor() {
    this.message = 'Something went wrong';
  }
}
