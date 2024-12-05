import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = []; // Store filtered users
  newUser: User = { id: 0, username: '', password: '', groupId: 0 };
  isLoading: boolean = true;
  errorMessage: string = '';
  count = 6;
  
  // For Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchQuery: string = ''; // For search filter

  constructor(private userService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    // Load existing users from the service
    this.loadUsers();
  }

  // Load users from the user service
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = [...users];  // Set initial filtered users
        this.isLoading = false;
        this.paginateUsers(); // Paginate after users are loaded
      },
      error: (err) => {
        this.errorMessage = 'Error fetching users!';
        this.isLoading = false;
      }
    });
  }

  // Filter users based on the search query
  filterUsers() {
    // Reset pagination to the first page when the search query changes
    this.currentPage = 1;

    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.paginateUsers(); // Re-paginate after filtering
  }

  // Paginate the filtered users
  paginateUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredUsers = this.filteredUsers.slice(start, end);
  }

  // Change the current page and re-paginate
  setPage(page: number) {
    if (page < 1) {
      return; // Prevent going to a negative page
    }
    this.currentPage = page;
    this.paginateUsers();
  }

  // Redirect to the registration page
  addUser(): void {
    this.router.navigate(['/register']);
  }

  // Deactivate user
  deactivateUser(userId: number) {
    this.userService.deactivateUser(userId).subscribe(
      response => {
        console.log('User deactivated successfully:', response);
        alert('User deactivated successfully');
      },
      error => {
        console.error('Error deactivating user:', error);
      }
    );
  }

  // Activate user
  activateUser(userId: number) {
    this.userService.activateUser(userId).subscribe(
      response => {
        console.log('User activated successfully:', response);
        alert('User activated successfully');
      },
      error => {
        console.error('Error activating user:', error);
      }
    );
  }
}
