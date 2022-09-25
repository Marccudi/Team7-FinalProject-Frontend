import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Developer } from "../models/developer";

const baseURL = "https://re-playproject.herokuapp.com/api/developers"
//const baseURL = "http://localhost:8181/api/developers"

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Developer[]>{
    return this.http.get<Developer[]>(baseURL);
  }

  get(id:any): Observable<any>{
    return this.http.get(`${baseURL}/${id}`);
  }

  create(data:any):Observable<any>{
    return this.http.post(baseURL, data);
  }
}
