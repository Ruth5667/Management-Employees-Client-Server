import { Employee } from "./employee.model"
import { Role } from "./role.models"

export class RoleToEmployee {
    // id?: number
    roleId?: number
    beginningOfWork!: Date
    management!:boolean        
     role!:Role
}