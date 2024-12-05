import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {User} from '../models/user'
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
    private URL = 'http://localhost:8080/api/user';

  constructor(private http:HttpClient) {}
   
  //Observable to handle asynchronous data streams
  login(username:string, password:string): Observable<any>{
    const body = {
        username,
        password
    };
    return this.http.post<any>(`${this.URL}/login`,body,{
      headers: new HttpHeaders({
        'Content-type' : 'application/json',
      }),
    });
  }
  register(username: string, password: string, groupId : number):Observable<any> {
    const body = {
      username,
      password,
      groupId
    };
    return this.http.post<any>(`${this.URL}/register`, body,{
      headers : new HttpHeaders({ 
        'Content-type' : 'application/json',
      }),
    });
  }
  getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.URL)
  }
  deactivateUser(userId: number): Observable<any> {
    return this.http.put<any>(`${this.URL}/deactivate/${userId}`, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  activateUser(userId: number):Observable<any> {
    return this.http.put<any>(`${this.URL}/activate/${userId}`, {} ,{
         headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
    }
  }