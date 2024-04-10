import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleToEmployee } from '../models/roleToEmployee';

@Injectable({
  providedIn: 'root'
})
export class RoleToEmployeeService {

  constructor(private _http: HttpClient) { }
  // getById(id: number):Observable<RoleToEmployee>{
  //   this._http.get('')
  // }
  addARoleToEmployee(role: RoleToEmployee): Observable<RoleToEmployee> {
    return this._http.post<RoleToEmployee>(`https://localhost:7033/api/RoleToEmployee`, role)
  }
  updateRoleToEmployee(role: RoleToEmployee){
    return this._http.put(`https://localhost:7033/api/RoleToEmployee/${role.role.id}`,role)
  }
  getRolesBId(idEmployee:number){
    
  }
  
}
