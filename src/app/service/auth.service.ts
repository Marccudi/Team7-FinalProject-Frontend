import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = "https://re-playproject.herokuapp.com/";

const httpOpt = {
  headers: new HttpHeaders({ 'Content-type' : 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged=false;
  isLoggedIn() {
    return this.logged;
  }

  constructor(private http:HttpClient) { }

  login(username:string, password:string):Observable<any>{
    this.logged=true;
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    },httpOpt);
  }


  register(username:string, password:string):Observable<any>{
    this.logged=false;
    return this.http.post(AUTH_API + 'api/users', {
      username,password
    }, httpOpt);
  }

}
