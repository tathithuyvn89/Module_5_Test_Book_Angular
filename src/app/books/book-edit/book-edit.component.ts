import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IBooks} from '../ibooks';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  id: number;
  book: IBooks;
  editBookForm: FormGroup;
  message: string;
  constructor(private bookService: BookService,
              private fb: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editBookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(100)]]
    });
    this.id = +this.route.snapshot.paramMap.get('id');
    this.bookService.findBookById(this.id).subscribe(data => {
      this.editBookForm.patchValue(data);
    });
  }

  submit() {
    let bookcons: Object;
    const updatedBook = this.editBookForm.value;
    this.bookService.updateBook(this.id, updatedBook).subscribe(data => {
      bookcons = data;
    } );
    console.log(bookcons);
    this.message = 'Bạn đã sửa thành công cuốn sách rồi nhé';
  }
  get title() {
    return this.editBookForm.get('title');
  }
  get author() {
    return this.editBookForm.get('author');
  }
  get description() {
    return this.editBookForm.get('description');
  }

}
