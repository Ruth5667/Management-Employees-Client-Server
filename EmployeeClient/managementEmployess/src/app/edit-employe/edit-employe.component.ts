import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AddRoleToEmployeeComponent } from "../add-role-to-employee/add-role-to-employee.component";
import { RoleToEmployee } from '../models/roleToEmployee';
// function tenYearsAfterValidator(control: FormControl): { [key: string]: boolean } | null {
//   const selectedDate = new Date(control.value);
//   const today = new Date();
//   return selectedDate < today ? null : { futureDate: true };
//}
// function tenYearsAfterValidator(dateOfBirthControl: FormControl): any {
//   return (control: FormControl): { [key: string]: boolean } | null => {
//     const dateOfBirth = new Date(dateOfBirthControl.value);
//     const beginningOfWork = new Date(control.value);

//     const differenceInYears = beginningOfWork.getFullYear() - dateOfBirth.getFullYear();

//     return differenceInYears >= 10 ? null : { 'tenYearsAfter': true };
//   };
// }
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
  today = new Date();
  tenYearsAgo = new Date(this.today.getFullYear() - 10, this.today.getMonth(), this.today.getDate());
  tzFormControl: any;
  addRoles() {
    this.addRole = true
    this.fromEdit = true;
    this.countAdd++;
  }
  addItem($event: RoleToEmployee) {
    (this.EditEmployeeForm.get('roles') as FormArray).push(new FormControl($event));
    console.log(this.EditEmployeeForm);
  }
  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  updateEmployee() {
    this.tzFormControl = this.EditEmployeeForm.get('tz');
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
    // const dateOfBirthControl = this.EditEmployeeForm.get('dateOfBirth');
    // const beginningOfWorkControl = new FormControl(new Date(), [Validators.required]);
    // if (dateOfBirthControl) {
    //   beginningOfWorkControl.setValidators([Validators.required, tenYearsAfterValidator(dateOfBirthControl)]);
    // } else {
    //   console.error('dateOfBirth control is not defined');
    // }
    this.EditEmployeeForm = this.formBuilder.group({
      "id": new FormControl(1111),
      "firstName": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      "lastName": new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      "tz": new FormControl("", [Validators.required]),
      "dateOfBirth": new FormControl(new Date, [Validators.required]),
      "beginningOfWork": new FormControl(new Date, [Validators.required]),
      "gender": new FormControl(0),
      "roles": new FormArray([])
    });
  }






}
