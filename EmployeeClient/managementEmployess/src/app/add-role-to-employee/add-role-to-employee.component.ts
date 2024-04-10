import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleToEmployeeService } from '../services/roleToEmployee.service';
import { RolesService } from '../services/roles.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../models/role.models';
import { RoleToEmployee } from '../models/roleToEmployee';
import Swal from 'sweetalert2';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-add-role-to-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-role-to-employee.component.html',
  styleUrl: './add-role-to-employee.component.css'
})

export class AddRoleToEmployeeComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<RoleToEmployee>();
  // @Input() employee!: Employee;
  @Input() employee!: Employee;
  public rolesList: Role[] = [];
  public updatedRole!: Role;
  public selectedRoles: RoleToEmployee[] = [];
  // role: FormControl<Role> = new FormControl<Role>({ id:0,name:""});
  // set currentEmployee(value: Employee) {
  //   console.log("###########3",value)
  //   this.employee = value;
  // }
  showFormRole!: boolean;
  hasRoles!: boolean;
  @Input() fromEdit!: boolean;
  ngOnInit() {
    this._roleService.getAllRoles().subscribe({
      next: (res: Role[]) => {
        this.rolesList = res;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'OOPS...',
          text: 'err',
        })
      }
    })
    // this.currentEmployee=this.employee;
    console.log("###########3", this.employee)
    if (this.employee && this.employee.roles) {
      this.roleData.addControl("roleId", new FormControl());
      for (var i = 0; i < this.employee.roles.length; i++) {
        console.log("selectedRoles", this.selectedRoles);
        console.log("###########4", this.employee.roles[i] as RoleToEmployee)
        this.roleData.setValue(this.employee.roles[i] as RoleToEmployee);
        this.selectedRoles.push(this.employee.roles[i] as RoleToEmployee);
        console.log("selectedRoles", this.selectedRoles);
      }
      this.selectedRoles.forEach(selectedRole => {
        if (selectedRole.roleId !== undefined) {
          this._roleService.getById(selectedRole.roleId).subscribe({
            next: (role) => {
              selectedRole.role = role; // החלפת האובייקט במערך באובייקט שהתקבל מהשרת
            },
            error: (error) => {
              console.error('Error fetching role by ID:', error);
            }
          });
        }
      });

    }
  }
  selectedRoleId!: string;

  onRoleSelected(event: Event) {
    const selectedRoleId = (event.currentTarget as HTMLSelectElement).value;
    this.selectedRoleId = selectedRoleId;

  }

  addRoleToEmployee() {
    var rolese = this.selectedRoleId?.split('|');
    // this.updatedRole=({ id: parseInt(rolese[0]), name:rolese[1] });
    this.roleData.controls['role'].setValue({ id: parseInt(rolese[0]), name: rolese[1] });
    this.dataEvent.emit(this.roleData.value as RoleToEmployee);
    this.selectedRoles.push(this.roleData.value as RoleToEmployee);
    console.log("selectedRoles", this.selectedRoles);
    this.selectedRoleId = this.roleData.value.role.id.toString();
    // this.updatedRoles.push(this.roleData.value as RoleToEmployee);
    Swal.fire({
      icon: 'success',
      text: 'The role added!',
      showConfirmButton: false, // ללא כפתור
      timer: 2000,

    })
    // this.showFormRole=false;

  }

  //@Input() RoleToEmployee{employeeId: number,roleId:number};
  // @Input() ;
  constructor(private _roleToEmployeeService: RoleToEmployeeService, private _roleService: RolesService, private router: Router) { }

  roleData: FormGroup = new FormGroup({
    "beginningOfWork": new FormControl(new Date,[Validators.required]),
    "management": new FormControl(false),
    "role": new FormControl<Role>({ "id": 1, "name": "" })
  });
}

