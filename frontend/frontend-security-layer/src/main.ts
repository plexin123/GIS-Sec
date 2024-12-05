// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthServiceService } from './app/services/auth-service.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    AuthServiceService, // Provide the AuthService globally
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
