import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, MatButtonModule, MatIconModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  @Input() employee!: Employee

  constructor(private router: Router, private _employeeService: EmployeeService) { }
  deleteEmployee() {
    if (sessionStorage.getItem("connect") != null && sessionStorage.getItem("connect") == "true" && sessionStorage.getItem("tz") == this.employee.tz) {
      this._employeeService.updateStatus(this.employee).subscribe({
        error: (err) => {
          Swal.fire({
            title: ' error',
          });
          console.log(err);
        },
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'deleted',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            window.location.reload();
          });
        }
      });
    }
    else {
      Swal.fire({
        icon: 'info',
        title: 'OOPS...',
        text: 'login before!',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
  edit() {
    if (sessionStorage.getItem("connect") != null && sessionStorage.getItem("connect") == "true" && sessionStorage.getItem("tz") == this.employee.tz)
      this.router.navigate(['editEmployee', this.employee.id]);
    else {
      Swal.fire({
        icon: 'info',
        title: 'OOPS...',
        text: 'login before!',
        showConfirmButton: false,
        timer: 2000,
      });
      this.router.navigate(["/login"]);
    }
  }
}
