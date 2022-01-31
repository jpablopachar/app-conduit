import { Component, Input, OnInit } from '@angular/core';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';

@Component({
  selector: 'app-backend-error-messages',
  template: `<ul class="error-messages">
    <li *ngFor="let errorMessage of errorMessages">
      {{ errorMessage }}
    </li>
  </ul>`,
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input() errors!: BackendErrors | null;

  public errorMessages: string[];

  constructor() {
    this.errorMessages = [];
  }

  ngOnInit(): void {
    if (this.errors) {
      this.errorMessages = Object.keys(this.errors).map(
        (name: string): string => {
            const messages: string = this.errors ? this.errors[name].join(' ') : '';
            return `${name} ${messages}`;
        }
      );
    }
  }
}
