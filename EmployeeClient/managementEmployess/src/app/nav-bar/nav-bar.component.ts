import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
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
  constructor(private router: Router, public _employeeService: EmployeeService) {

  }
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
  exportEmployeesToExcel() {
    const homeComponent = new EmployeeTableComponent(this._employeeService); // יצירת מופע של הקומפוננטה הביתית
    homeComponent.exportToExcel(); // קריאה לפונקציה בקומפוננטה הביתית
    //this.router.navigate(['/']); // ניווט לעמוד הבית

    // this._employeeTableComponent.exportToExcel();

  }



}

