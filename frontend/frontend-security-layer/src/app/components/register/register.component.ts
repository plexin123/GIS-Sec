import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username : string = '';
  password : string = '';
  groupId : number = 1;
  errorMessage: string = '';

  constructor(private authService: AuthServiceService , private router: Router){}
  
  register(){
    this.authService.register(this.username, this.password,this.groupId).subscribe({
      next : (response) => {
        localStorage.setItem('username',JSON.stringify(response));
        const storedUser= localStorage.getItem('username');
        console.log("Works!");
        this.router.navigate(['/user']);
        console.log(storedUser);

      },
      error: (err) => {
        console.error(`Register  Failed`, err);
        this.errorMessage = 'Invalid email or password';
      },
    });
  }
}

