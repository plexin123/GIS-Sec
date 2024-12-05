import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.css'
})
export class StudentRegisterComponent {

  firstname :string = "";
  lastname : string = "";
  email : string = "";
  description: string = "";
  errorMessage: string = "";

  constructor( private authService:StudentService, private router:Router){}

  register(){
    this.authService.register(this.firstname, this.lastname,this.email, this.description).subscribe({
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
