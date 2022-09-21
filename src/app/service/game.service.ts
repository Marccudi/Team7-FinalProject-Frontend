import { Injectable } from '@angular/core';
import { Game } from "../models/game";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const baseURL = "https://re-playproject.herokuapp.com/api/games";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Game[]> {
    let url = baseURL;
    console.log(url);
    return this.http.get<Game[]>(url);
  }

  get(id: any): Observable<any> {
    let url = `${baseURL}/${id}`;
    console.log(url);
    return this.http.get(url);
  }
}
