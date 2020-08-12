import { Component, OnInit } from '@angular/core';
import {IBooks} from '../ibooks';
import {BookService} from '../book.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {

  id: number;
  book: IBooks;
  message: string;
  deleted: boolean;
  constructor(private bookSevice: BookService,
              private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.bookSevice.findBookById(this.id).subscribe(data => {
      this.book = data;
      this.deleted = false;
    });
  }

  deleteThisBook() {
    this.bookSevice.deleteBook(this.id).subscribe(data => {
      this.message = data.message;
    });
    this.deleted = true;
  }

}
