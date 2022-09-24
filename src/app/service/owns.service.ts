import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Own } from '../models/own';
import { Game } from '../models/game';

const baseURL = "https://re-playproject.herokuapp.com/api/owns";
//const baseURL = "http://localhost:8181/api/borrows";

@Injectable({
  providedIn: 'root'
})
export class OwnsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Own[]> {
    let url = baseURL;
    console.log(url);
    return this.http.get<Own[]>(url);
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
  delBorrow(idBorrow:number): Observable<Own>{
    let url = `${baseURL}/${idBorrow}`;
    console.log(url);
    return this.http.delete(url)
  }
  saveBorrow(idBorrow:number, newBorrow:any): Observable<Own>{
    let url = `${baseURL}/${idBorrow}`;
    return this.http.put(url,newBorrow);
  }
  create(data:any):Observable<any>{
    console.log("URL"+baseURL);
    console.log('DATA:');
    console.log(data);
    return this.http.post(baseURL, data);
  }
}
