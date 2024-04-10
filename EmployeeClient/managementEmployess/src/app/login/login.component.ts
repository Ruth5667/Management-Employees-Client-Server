import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, EmployeeTableComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent
  //{
  //   LoginForm: FormGroup = new FormGroup({
  //     "userName": new FormControl("", [Validators.required, Validators.minLength(3)]),
  //     "Tz": new FormControl(0, [Validators.required])
  //   })
  //   public showLogin: boolean = true
  //   public showErrorMessege: boolean = false

  //   constructor(private _employeeService: EmployeeService, private router: Router) { }
  implements OnInit {
  public LoginForm!: FormGroup
  static flag: boolean | null = false;
  showRotatingIcon: boolean | undefined;
  hide: boolean | undefined;
  userExists: boolean | undefined;

  constructor(private router: Router) { }
  // public user: user = { name: '', password: '', Address: '', Email: ''}; // Initialize user object
  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.minLength(3)]),
      'tz': new FormControl("", Validators.required),
    });
  }

  public getUsers() {
    if (this.LoginForm.valid) {
      const username = this.LoginForm.get('name')?.value;
      const tz = this.LoginForm.get('tz')?.value;
      console.log("name", username)
      // שמירת פרטי הגולש ב-SessionStorage
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('tz', tz);
      sessionStorage.setItem('connect', "true");
      Swal.fire({
        icon: 'success',
        title: 'You entered successfully',
        showConfirmButton: false, // ללא כפתור
        timer:2000,
      });
      this.router.navigate(["/"]);


    }
    else {
      Swal.fire({
        icon:'error',
        text: 'enter details again!',
        timer: 2000
      })
    }
  }


  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}

//   login() {
//     this._employeeService.login(this.LoginForm.value as Employee).subscribe(
//       {
//         error: (err) => {
//           this.router.navigate(["register"]),
//           console.log(err);
//         },
//         next: (res) => {
//           if (!res)
//             this.showErrorMessege = true;
//           else {
//             sessionStorage.setItem("currentUserId", (res.id ?? 0).toString());
//             this.router.navigate(["home","allRecipes"])
//             this.showLogin = false;
//           }
//         }
//       })
//   }
// }
// sessionStorage.setItem("currentUserId", (res.id ?? 0).toString())
//}
