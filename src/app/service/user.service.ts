import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = "https://re-playproject.herokuapp.com/api/users"
//const baseUrl = "http://localhost:8181/api/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /*getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }*/

  get(id: any): Observable<User> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any) {
    return this.http.put(`${baseUrl}/${id}`, data).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  getUserbyName(name :any){
    return this.http.get(`${baseUrl}/username/${name}`);
  }

}
