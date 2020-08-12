import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBooks} from './ibooks';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:3000/books';
  constructor(private http: HttpClient) {
  }
  getAllBooks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  // tslint:disable-next-line:ban-types
  createBook( book: Object): Observable<Object> {
    return this.http.post(this.baseUrl, book);
  }
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  findBookById(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  updateBook(id: number, book: IBooks): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, book);
  }
}
