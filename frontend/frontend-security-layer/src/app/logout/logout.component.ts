import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private router: Router){}

  ngOnInit(): void {
    // Perform any logout actions here, such as clearing local storage
    // localStorage.removeItem('token'); // Example of clearing authentication data

    // Redirect to login page after logout
    this.router.navigate(['/login']);

  }
}
