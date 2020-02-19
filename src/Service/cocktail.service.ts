import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/Category';
import {Cocktails} from '../models/Cocktails';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private filterUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  private listUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';
  constructor(private http: HttpClient) {
  }

  getListCategory(): Observable<Category> {
    return this.http.get<Category>(`${this.filterUrl}`);
  }
  getListByFilter(filter: string): Observable<Cocktails> {
    return this.http.get<Cocktails>(`${this.listUrl}c=${filter}`);
  }
}
