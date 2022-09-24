import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Genre } from "../models/genre";

const baseURL = "https://re-playproject.herokuapp.com/api/genres"
//const baseURL = "http://localhost:8181/api/genres"

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Genre[]>{
    return this.http.get<Genre[]>(baseURL);
  }

  get(id:any): Observable<any>{
    return this.http.get(`${baseURL}/${id}`);
  }

  create(data:any):Observable<any>{
    return this.http.post(baseURL, data);
  }
}
