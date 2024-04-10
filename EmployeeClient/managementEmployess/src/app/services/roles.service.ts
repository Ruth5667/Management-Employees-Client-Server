import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.models';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private _http: HttpClient) { }
  
  getAllRoles():Observable<Role[]>{
    return this._http.get<Role[]>(`https://localhost:7033/api/Roles`)
  }
  getById(id: number): Observable<Role>{
    return this._http.get<Role>(`https://localhost:7033/api/Roles/${id}`)
  }
}


