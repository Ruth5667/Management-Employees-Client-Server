import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolesService } from '../services/roles.service';
import { Role } from '../models/role.models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddRoleToEmployeeComponent } from '../add-role-to-employee/add-role-to-employee.component';
import { Text } from '@angular/compiler';
import { RoleToEmployee } from '../models/roleToEmployee';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule, AddRoleToEmployeeComponent]
})
export class AddEmployeeComponent implements OnInit {
  fromEdit!:boolean;
  countAdd: number=0;
  addItem($event: RoleToEmployee) {
    (this.NewEmployeeForm.get('roles') as FormArray).push(new FormControl($event));
    console.log(this.NewEmployeeForm);
  }
  public addRole!: boolean;
  addRoles() {
    this.addRole = true;
    this.fromEdit=true;
    this.countAdd++;

  }
  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
  constructor(private _employeeService: EmployeeService, private _roleService: RolesService, private router: Router) { }
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
    console.log("#################################3", this.NewEmployeeForm.value)
    this._employeeService.AddANewEmployee(this.NewEmployeeForm.value as Employee).subscribe(
      {
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'OOPS...',
            text: 'error',
          })
        },
        next: (resp) => {
          Swal.fire({
            title: 'Alert',
            text: 'added succesfully',
            icon: 'success',
            showConfirmButton: false, // ללא כפתור
            timer:2000,
          });
          this.router.navigate(['/']);
        }
      })
  }
  NewEmployeeForm: FormGroup = new FormGroup({
    "firstName": new FormControl("",[Validators.required]),
    "lastName": new FormControl("",[Validators.required]),
    "tz": new FormControl("",[Validators.required]),
    "dateOfBirth": new FormControl(new Date,[Validators.required]),
    "beginningOfWork": new FormControl(new Date,[Validators.required]),
    "gender": new FormControl(0),
    "roles": this.roles
  })

}
