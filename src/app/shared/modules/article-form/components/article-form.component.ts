import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticleInput } from 'src/app/shared/models/ArticleInput';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styles: [],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues!: ArticleInput | null;
  @Input() isSubmitting!: boolean | null;
  @Input() errors!: BackendErrors | null;

  @Output() articleSubmit: EventEmitter<ArticleInput>;

  public form: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.articleSubmit = new EventEmitter<ArticleInput>();
    this.form = this._formBuilder.group({
      title: null,
      description: null,
      body: null,
      tagList: null,
    });
  }

  ngOnInit(): void {
    if (this.initialValues) {
      const { title, description, body, tagList } = this.initialValues;
  
      this.form.setValue({ title, description, body, tagList });
    }
  }

  public onSubmit(): void {
    this.articleSubmit.emit(this.form.value);
  }
}