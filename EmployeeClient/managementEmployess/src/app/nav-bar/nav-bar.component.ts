import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, EmployeeTableComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router, public _employeeService: EmployeeService) { }
  logout() {
    sessionStorage.clear();
    this.router.navigate(["/"])
    Swal.fire({
      icon: 'info',
      title: 'you did logout!',
    })
  }

  addEmployee() {
    this.router.navigate(['addEmployee']);
  }
}

