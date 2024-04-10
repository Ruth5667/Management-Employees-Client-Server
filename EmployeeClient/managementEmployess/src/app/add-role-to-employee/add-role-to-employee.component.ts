import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolesService } from '../services/roles.service';
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
  @Input() employee!: Employee;
  public rolesList: Role[] = [];
  public updatedRole!: Role;
  public selectedRoles: RoleToEmployee[] = [];
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
          text: err,
        })
      }
    })
    if (this.employee && this.employee.roles) {
      this.roleData.addControl("roleId", new FormControl());
      for (var i = 0; i < this.employee.roles.length; i++) {
        this.roleData.setValue(this.employee.roles[i] as RoleToEmployee);
        this.selectedRoles.push(this.employee.roles[i] as RoleToEmployee);
      }
      this.selectedRoles.forEach(selectedRole => {
        if (selectedRole.roleId !== undefined) {
          this._roleService.getById(selectedRole.roleId).subscribe({
            next: (role) => {
              selectedRole.role = role;
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
    this.roleData.controls['role'].setValue({ id: parseInt(rolese[0]), name: rolese[1] });
    this.dataEvent.emit(this.roleData.value as RoleToEmployee);
    this.selectedRoles.push(this.roleData.value as RoleToEmployee);
    this.selectedRoleId = this.roleData.value.role.id.toString();
    Swal.fire({
      icon: 'success',
      text: 'The role added!',
      showConfirmButton: false, // ללא כפתור
      timer: 2000,

    })
  }
  constructor(private _roleService: RolesService) { }
  roleData: FormGroup = new FormGroup({
    "beginningOfWork": new FormControl(new Date, [Validators.required]),
    "management": new FormControl(false),
    "role": new FormControl<Role>({ "id": 1, "name": "" })
  });
}

