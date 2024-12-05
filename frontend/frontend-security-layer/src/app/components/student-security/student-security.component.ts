import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-security',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-security.component.html',
  styleUrls: ['./student-security.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class StudentSecurityComponent implements OnInit {
  currentUser : string | null = null;
  showNavbar = true;
  isDropdownOpen = false;
  

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('username');

    // Subscribe to router events to detect changes in the route
    this.router.events.subscribe(() => {
      this.checkNavbarVisibility();
    });
    // Initial check
    this.checkNavbarVisibility();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  Users(){
    this.router.navigate(['/user']);
  }
  StudentList(){
    this.router.navigate(['/studentList']);
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }


  private checkNavbarVisibility() {
    const currentUrl = this.router.url;
    // Hide navbar if on login or register page
    this.showNavbar = !(currentUrl.includes('/login') || currentUrl.includes('/register'));
  }
}
