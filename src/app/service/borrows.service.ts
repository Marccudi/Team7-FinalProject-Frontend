import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Borrow } from '../models/borrow';
import { Game } from '../models/game';

const baseURL = "https://re-playproject.herokuapp.com/api/borrows";

@Injectable({
  providedIn: 'root'
})
export class BorrowsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Borrow[]> {
    let url = baseURL;
    console.log(url);
    return this.http.get<Borrow[]>(url);
  }

  get(id: any): Observable<any> {
    let url = `${baseURL}/${id}`;
    console.log(url);
    return this.http.get(url);
  }

  getBorrowedGamesByOwner(idOwner:any): Observable<Game[]>{
    let url = baseURL+'/owner/'+idOwner;
    console.log(url);
    return this.http.get<Game[]>(url);
  }

}
