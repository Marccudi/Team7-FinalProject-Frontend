import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Platform } from "../models/platform";

const baseURL = "https://re-playproject.herokuapp.com/api/platforms"

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Platform[]>{
    return this.http.get<Platform[]>(baseURL);
  }

  get(id:any): Observable<any>{
    return this.http.get(`${baseURL}/${id}`);
  }

}
