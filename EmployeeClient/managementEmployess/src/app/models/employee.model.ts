import { RoleToEmployee } from "./roleToEmployee"
export class Employee {
    id?: number
    tz!: string
    firstName!: string
    lastName!: string
    dateOfBirth!: Date
    gender!: number
    beginningOfWork!: Date
    status?: boolean
    roles?: RoleToEmployee[] = []
}


