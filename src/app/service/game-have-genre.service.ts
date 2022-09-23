import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GameHaveGenre } from '../models/game-have-genre';

const baseURL = "https://re-playproject.herokuapp.com/api/gameHaveGenres";

@Injectable({
  providedIn: 'root'
})
export class GameHaveGenreService {

  constructor(private http: HttpClient) { }

  getGenresXGame(idGame: any): Observable<GameHaveGenre[]> {
    let url = `${baseURL}/game/${idGame}`;
    console.log(url);
    return this.http.get<GameHaveGenre[]>(url);
  }

  create(data:any):Observable<any>{
    return this.http.post(baseURL, data);
  }
}
