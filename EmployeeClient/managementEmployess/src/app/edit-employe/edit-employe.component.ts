import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AddRoleToEmployeeComponent } from "../add-role-to-employee/add-role-to-employee.component";
import { RoleToEmployee } from '../models/roleToEmployee';
//valid Israel Identity:
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
  selector: 'app-edit-employe',
  standalone: true,
  templateUrl: './edit-employe.component.html',
  styleUrl: './edit-employe.component.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AddRoleToEmployeeComponent]
})
export class EditEmployeComponent implements OnInit {
  fromEdit!: boolean;
  @Input()
  employee!: Employee
  employeeId!: number
  editRoles!: boolean;
  addRole!: boolean;
  countAdd: number = 0;
  EditEmployeeForm!: FormGroup;
  tzFormControl: any;
  addRoles() {
    this.addRole = true
    this.fromEdit = true;
    this.countAdd++;
  }
  addItem($event: RoleToEmployee) {
    // const rolesArray = this.EditEmployeeForm.get('roles') as FormArray;
    // const newRoleControl = new FormControl($event);
    // if (!rolesArray.controls.some(control => control.value === newRoleControl.value)) {
    //   rolesArray.push(newRoleControl);
    // } else {
    //   alert('Control already exists in the FormArray');
    // }
    (this.EditEmployeeForm.get('roles') as FormArray).push(new FormControl($event));
  }
  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
  deleteRole(index: number) {
//     // const rolesArray = this.EditEmployeeForm.get('roles') as FormArray;
//     // const index = rolesArray.controls.findIndex(control => control.value.roleId === roleId);
//     // if (index !== -1) {
//     //   rolesArray.removeAt(index);
//     console.log(index,"index edit");
    console.log((this.EditEmployeeForm.get('roles') as FormArray).at(index),"before");
    (this.EditEmployeeForm.get('roles') as FormArray).removeAt(index);
console.log((this.EditEmployeeForm.get('roles') as FormArray).at(index),"after")
   
//     // else {
//     //   console.log('Role with ID', roleId, 'was not found');
//     //}
  
 } 
  updateEmployee() {
    this.tzFormControl = this.EditEmployeeForm?.get('tz');
    if (this.tzFormControl.value) {
      if (!validateIDNumber(this.tzFormControl.value)) {
        alert("tz is not valid")
        return;
      }
    }
    this._employeeService.updateEmployee(this.EditEmployeeForm.value as Employee).subscribe({
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
          text: 'updated succesfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
        this.router.navigate(['/']);
      }
    })
  }
  get roles() {
    return this.EditEmployeeForm.get('roles') as FormArray;
  }
  addNewRoles() {
    this.roles.push(new FormControl(''));
  }
  constructor(private _employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.employeeId = param['employeeId']

    });
    this._employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (res) => {
        this.EditEmployeeForm.setValue({ ...res, roles: [] });
        const rolesList = res.roles ?? []
        for (let i = 0; i < rolesList.length; i++) {
          this.addNewRoles();
          this.roles.controls[i].setValue(rolesList[i])
        }
        this.employee = res
        this.editRoles = true
      },
    })
    this.EditEmployeeForm = this.formBuilder.group({
      "id": new FormControl(1111),
      "firstName": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      "lastName": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      "tz": new FormControl("", [Validators.required]),
      "dateOfBirth": new FormControl(new Date, [Validators.required, this.validateAge]),//Validate age
      "beginningOfWork": new FormControl(new Date, [Validators.required, this.validateMinEntryDate]),//validete Begining Date
      "gender": new FormControl(0),
      "roles": new FormArray([])
    });
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
    const field = this.EditEmployeeForm.get(fieldName);
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





