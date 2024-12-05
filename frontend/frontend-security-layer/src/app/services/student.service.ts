
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private URL = 'http://localhost:8080/api/student'

  constructor(private http:HttpClient) {}
  register(firstName: string, lastName: string, email : string, description:string):Observable<any> {
    const body = {
      firstName,  
      lastName,
      email,
      description
    };
    return this.http.post<any>(`${this.URL}/register`, body,{
      headers : new HttpHeaders({ 
        'Content-type' : 'application/json',
      }),
    });
  }
  getStudents(): Observable<Student[]> {
      return this.http.get<Student[]>(this.URL)
  }


}
