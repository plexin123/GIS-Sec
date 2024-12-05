import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { AuthServiceService } from './services/auth-service.service';
import { StudentSecurityComponent } from "./components/student-security/student-security.component";
import { LogoutComponent } from './logout/logout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RouterModule, StudentSecurityComponent,LogoutComponent,RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private authService: AuthServiceService) {} // Inject AuthService here
}
