import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, EmployeeTableComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent
  implements OnInit {
  public LoginForm!: FormGroup
  static flag: boolean | null = false;
  showRotatingIcon: boolean | undefined;
  hide: boolean | undefined;
  userExists: boolean | undefined;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.minLength(3)]),
      'tz': new FormControl("", Validators.required),
    });
  }

  public getEmployee() {
    if (this.LoginForm.valid) {
      const username = this.LoginForm.get('name')?.value;
      const tz = this.LoginForm.get('tz')?.value;
      // שמירת פרטי הגולש ב-SessionStorage
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('tz', tz);
      sessionStorage.setItem('connect', "true");
      Swal.fire({
        icon: 'success',
        title: 'You entered successfully',
        showConfirmButton: false,
        timer: 2000,
      });
      this.router.navigate(["/"]);
    }
    else {
      Swal.fire({
        icon: 'error',
        text: 'enter details again!',
        timer: 2000
      })
    }
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}

