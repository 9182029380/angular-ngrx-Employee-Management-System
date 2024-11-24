import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeListPageComponent } from './pages/employee-list/employee-list-page.component';
import { EmployeeFormPageComponent } from './pages/employee-form/employee-form-page.component';
import { EmployeeDetailsPageComponent } from './pages/employee-details/employee-details-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employees', component: EmployeeListPageComponent },
  { path: 'employees/add', component: EmployeeFormPageComponent },
  { path: 'employees/edit/:id', component: EmployeeFormPageComponent },
  { path: 'employees/:id', component: EmployeeDetailsPageComponent },
  { path: '**', redirectTo: '' }
];