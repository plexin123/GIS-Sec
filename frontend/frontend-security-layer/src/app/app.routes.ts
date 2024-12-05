import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentSecurityComponent } from './components/student-security/student-security.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { LogoutComponent } from './logout/logout.component';
import { StudentListComponent } from './student-list/student-list.component';
import { UserComponent } from './components/user/user.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';

export const routes: Routes = [
// {path: '', redirectTo : '/login', pathMatch: 'full'},
{path:'login', component: LoginComponent},
{path:'register', component: RegisterComponent},
{path:'registerStudent', component: StudentRegisterComponent},
{path:'studentList', component: StudentListComponent},
{path:'logout', component: LogoutComponent },
{path:'student', component: StudentSecurityComponent},
{path:'user', component: UserComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AuthRoutingModule {}
