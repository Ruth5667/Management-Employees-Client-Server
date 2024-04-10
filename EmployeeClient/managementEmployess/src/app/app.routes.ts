import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./employee-table/employee-table.component').then(c => c.EmployeeTableComponent) },
    { path: 'employee', loadComponent: () => import('./employee/employee.component').then(c => c.EmployeeComponent) },
    { path: 'editEmployee/:employeeId', loadComponent: () => import('./edit-employe/edit-employe.component').then(c => c.EditEmployeComponent) },
    { path: 'addEmployee', loadComponent: () => import('./add-employee/add-employee.component').then(c => c.AddEmployeeComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) }

];
