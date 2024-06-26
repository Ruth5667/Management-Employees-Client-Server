import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }
  //get all the employees
getAllEmployees(): Observable<Employee[]>{
  return this._http.get<Employee[]>(`https://localhost:7033/api/Employees`)
}
updateEmployee(employee: Employee){
  return this._http.put(`https://localhost:7033/api/Employees/${employee.id}`,employee)
}

AddANewEmployee(employee: Employee):Observable<Employee>{
return this._http.post<Employee>(`https://localhost:7033/api/Employees`,employee)
}
updateStatus(employee: Employee){
  return this._http.put(`https://localhost:7033/api/Employees/UpdateStatus/${employee.id}`,employee)
}

getEmployeeById(id: number): Observable<Employee>{
  return this._http.get<Employee>(`https://localhost:7033/api/Employees/${id}`)

}

}
