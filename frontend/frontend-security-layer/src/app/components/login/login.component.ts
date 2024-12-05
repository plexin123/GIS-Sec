import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})  
export class LoginComponent {

  username : string = '';
  password : string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService , private router: Router){}
  
  login(){
    this.authService.login(this.username, this.password).subscribe({
      next : (response) => {
        localStorage.setItem('username',response.username);
        console.log("Works!");
        //take the saved data in a variable and export that
        // const username = response.username;
        console.log(response.username);
        this.router.navigate(['/studentList']);

      },
      error: (err) => {
        if(err.status == 400 && err.err === "User is deactivated") this.errorMessage= "Your accoun has been deactivated";
        else this.errorMessage = 'Invalid email or password';
      },
    });
  }
}
