import { Component, OnInit } from '@angular/core';
import { EmployeeComponent } from "../employee/employee.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as ExcelJS from 'ExcelJS';
import { saveAs } from 'file-saver'
@Component({
    selector: 'app-employee-table',
    standalone: true,
    templateUrl: './employee-table.component.html',
    styleUrl: './employee-table.component.css',
    imports: [EmployeeComponent, CommonModule, ReactiveFormsModule, FormsModule, EmployeeComponent, MatButtonModule, MatIconModule]
})
export class EmployeeTableComponent implements OnInit {
    public employeesList: Employee[] = [];
    public employeesListByFilter: Employee[] = [];
    filterForm: FormGroup = new FormGroup({
        search: new FormControl(null),
    })
    ngOnInit(): void {
        this.filterForm.valueChanges.subscribe(form => {
            this.employeesListByFilter = this.employeesList.filter(employee =>
                employee.firstName.toLocaleLowerCase().includes(form.search.toLocaleLowerCase()) ||
                employee.lastName.toLowerCase().includes(form.search.toLocaleLowerCase()) ||
                employee.tz.toLowerCase().includes(form.search.toLocaleLowerCase()))
        });

        this._employeeService.getAllEmployees().subscribe(
            {
                next: (resp) => {
                    this.employeesList = resp;
                    this.employeesListByFilter = this.employeesList

                }
            })
    }
    constructor(private _employeeService: EmployeeService) { }
    exportToExcel() {
        setTimeout(() => {
            this.exportToExcel();
        }, 5555);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Employees');

        // הוספת כותרות העמודות
        worksheet.addRow(['First Name', 'Last Name', 'Tz', 'Begining Of Job']);

        // הוספת הנתונים מהטבלה
        this.employeesList.forEach(employee => {
            worksheet.addRow([employee.firstName, employee.lastName, employee.tz, employee.beginningOfWork]);
        });

        // שמירת הקובץ
        workbook.xlsx.writeBuffer().then((buffer: BlobPart) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'Employees.xlsx');
        });
    }
}

