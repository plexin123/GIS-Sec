import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from'rxjs';
import { User } from '../../app/models/user';
// Adjust the path based on your project structure



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = []; // This would normally come from an API
  private usersSubject = new BehaviorSubject<User[]>(this.users);
  
  constructor() {
    // Initial mock data
    this.users = [
      { id: 1, username: 'JohnDoe', password: 'john@example.com', groupId: 1},
      { id: 2, username: 'JaneDoe', password: 'jane@example.com', groupId: 1},
    ];
    this.usersSubject.next(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(user: User): void {
    this.users.push(user);
    this.usersSubject.next(this.users);
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    this.usersSubject.next(this.users);
  }
}
