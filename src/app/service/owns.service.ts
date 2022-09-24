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

  get(id: any): Observable<any> {
    let url = `${baseURL}/${id}`;
    console.log(url);
    return this.http.get(url);
  }

  getExchangesPetitions(idOwner:any): Observable<Game[]>{
    let url = baseURL+'/'+idOwner+"/"+true;
    console.log(url);
    return this.http.get<Game[]>(url);
  }

  delOwn(idBorrow:number): Observable<Own>{
    let url = `${baseURL}/${idBorrow}`;
    console.log(url);
    return this.http.delete(url)
  }

  saveOwn(idOwn:number, dataOwn:any): Observable<Own>{
    let url = `${baseURL}/${idOwn}`;
    return this.http.put(url,dataOwn);
  }

  create(data:any):Observable<any>{
    console.log("URL"+baseURL);
    console.log('DATA:');
    console.log(data);
    return this.http.post(baseURL, data);
  }
}
