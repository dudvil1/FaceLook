import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { find, get, pull } from 'lodash';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.css']
})
export class TagsInputComponent implements OnInit {
  @ViewChild('tagInput') tagInputRef: ElementRef;
  @Input()
  tags: string[]
  @Input()
  placeholder: string

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.tags = this.tags || []
    this.placeholder = this.placeholder || "tags"
    this.form = this.fb.group({
      tag: [undefined],
    });
  }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.form.controls.tag.value;
    if (event.code === 'Comma' || event.code === 'Enter') {
      const tag = inputValue[inputValue.length - 1] == ',' ?
       inputValue.substring(0, inputValue.length - 1):inputValue
      this.addTag(tag);
      this.form.controls.tag.setValue('');
    }
  }

  addTag(tag: string): void {
    if (tag.length > 0 && !find(this.tags, tag)) {
      this.tags.push(tag);
    }
    console.log(this.tags)
  }

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
  }

}
