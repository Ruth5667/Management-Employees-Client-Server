import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolesService } from '../services/roles.service';
import { Role } from '../models/role.models';
import { AddRoleToEmployeeComponent } from '../add-role-to-employee/add-role-to-employee.component';
import { RoleToEmployee } from '../models/roleToEmployee';

function validateIDNumber(id_num: string): boolean {
  if (!id_num) return false;

  const id_12_digits: number[] = [1, 2, 1, 2, 1, 2, 1, 2, 1];
  id_num = id_num.padStart(9, '0');
  let result: number = 0;

  for (let i = 0; i < 9; i++) {
    let num: number = parseInt(id_num.charAt(i)) * id_12_digits[i];
    num = num >= 10 ? Math.floor(num / 10) + (num % 10) : num;
    result += num;
  }

  return result % 10 === 0;
}
@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AddRoleToEmployeeComponent]
})
export class AddEmployeeComponent implements OnInit {
  fromEdit!: boolean;
  countAdd: number = 0;
  showError!:boolean
  tzFormControl: any;
  NewEmployeeForm!: FormGroup;
  addItem($event: RoleToEmployee) {
    (this.NewEmployeeForm.get('roles') as FormArray).push(new FormControl($event));
    console.log(this.NewEmployeeForm);
  }
  public addRole!: boolean;
  addRoles() {
    this.addRole = true;
    this.fromEdit = true;
    this.countAdd++;

  }
  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
  constructor(private formBuilder: FormBuilder, private _employeeService: EmployeeService, private _roleService: RolesService, private router: Router) { }
  public rolesList: Role[] = [];
  roles: FormArray<FormControl<RoleToEmployee>> = new FormArray<FormControl<RoleToEmployee>>([]);
  ngOnInit(): void {
    this._roleService.getAllRoles().subscribe({
      next: (res: Role[]) => {
        this.rolesList = res;
      }
    })
  }
  addNewEmployee() {
    this.showError=true
    this.tzFormControl = this.NewEmployeeForm.get('tz');
    if (this.tzFormControl.value) {
      if (!validateIDNumber(this.tzFormControl.value)) {
        alert("tz is not valid")
        return;
      }
    }
    this._employeeService.AddANewEmployee(this.NewEmployeeForm.value as Employee).subscribe(
      {
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'OOPS...',
            text: err,
          })
        },
        next: () => {
          Swal.fire({
            title: 'Alert',
            text: 'added succesfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });
          this.router.navigate(['/']);
        }
      })
      this.NewEmployeeForm = this.formBuilder.group
  ({
    "firstName": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    "lastName": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    "tz": new FormControl("", [Validators.required]),
    "dateOfBirth": new FormControl(new Date, [Validators.required,  this.validateAge]),//Validate age
    "beginningOfWork": new FormControl(new Date, [Validators.required,this.validateMinEntryDate]),//Validate Begining Date
    "gender": new FormControl(0),
    "roles": this.roles
  })
  }
  validateAge(control: FormControl): { [key: string]: boolean } | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 3600 * 24 * 365.25));
    return age < 16 ? { age: true } : null;
  }
  validateMinEntryDate(control: FormControl): { [key: string]: boolean } | null {
    const today = new Date();
    const minEntryDate = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate()); // Minimum entry date: 4 years ago
    return control.value < minEntryDate ? { minEntryDate: true } : null;
  }
  getErrorMessage(fieldName: string): string {
    const field = this.NewEmployeeForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Is required.';
    } else if (field?.hasError('pattern')) {
      return 'Contains only letters.';
    } else if (field?.hasError('age')) {
      return 'Must be 16 years or older.';
    } else if (field?.hasError('minEntryDate')) {
      return 'Begining date must be at least four years in the past.';
    }
    return '';
  }
}

