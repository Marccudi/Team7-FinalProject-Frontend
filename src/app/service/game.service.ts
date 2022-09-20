import { Injectable } from '@angular/core';
import { Game } from "../models/game";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const baseURL = "https://re-playproject-nosecurity.herokuapp.com/api";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Game[]> {
    let url = baseURL + "/games";
    console.log(url);
    return this.http.get<Game[]>(url);
  }

  get(id: any): Observable<any> {
    let url = `${baseURL}/games/${id}`;
    console.log(url);
    return this.http.get(url);
  }
}
