import { Injectable } from '@angular/core';
import { Game } from "../models/game";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const baseURL = "https://re-playproject.herokuapp.com/api/games";
//const baseURL = "http://localhost:8181/api/games"

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

  get(id: any): Observable<Game> {
    let url = `${baseURL}/${id}`;
    console.log(url);
    return this.http.get(url);
  }

  getUserGames(idUser:any): Observable<Game[]>{
    let url = baseURL+'/user/'+idUser;
    console.log(url);
    return this.http.get<Game[]>(url);
  }

  create(data:any):Observable<any>{
    console.log("URL"+baseURL);
    console.log('DATA:');
    console.log(data);
    return this.http.post(baseURL, data);
  }

  update(id: any, data: any) {
    return this.http.put(`${baseURL}/${id}`, data);
  }

  delete(idGame: any, idUser: any): Observable<any> {
    return this.http.delete(baseURL+'/'+idGame+'/'+idUser);
  }
}
