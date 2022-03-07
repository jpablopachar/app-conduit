import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-pagination',
  template: `
    <ul class="pagination">
      <li
        *ngFor="let page of pages"
        class="page-item"
        [ngClass]="{ active: currentPage === page }"
      >
        <a
          [routerLink]="[url]"
          [queryParams]="{ page: page }"
          class="page-link"
        >
          {{ page }}
        </a>
      </li>
    </ul>
  `,
})
export class PaginationComponent implements OnInit {
  @Input() total!: number | undefined;
  @Input() limit!: number;
  @Input() currentPage!: number;
  @Input() url!: string;

  public pagesCount: number;
  public pages: number[];

  constructor(private readonly _utilService: UtilsService) {
    this.pagesCount = 0;
    this.pages = [];
  }

  ngOnInit(): void {
    console.log(this.total);
    
    if (this.total) {
      this.pagesCount = Math.ceil(this.total / this.limit);
      console.log(this.pagesCount);
      console.log(this.limit);
    }

    this.pages = this._utilService.range(1, this.pagesCount);
    console.log(this.pages);
  }
}
