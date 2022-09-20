import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GameHaveGenre } from '../models/game-have-genre';

const baseURL = "https://re-playproject-nosecurity.herokuapp.com/api";

@Injectable({
  providedIn: 'root'
})
export class GameHaveGenreService {

  constructor(private http: HttpClient) { }

  getGenresXGame(idGame: any): Observable<GameHaveGenre[]> {
    let url = `${baseURL}/gameHaveGenres/game/${idGame}`;
    console.log(url);
    return this.http.get<GameHaveGenre[]>(url);
  }
}
