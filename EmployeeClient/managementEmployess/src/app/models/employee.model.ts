import { RoleToEmployee } from "./roleToEmployee"
export class Employee {
    id?: number
    tz!: string
    firstName!: string
    lastName!: string
    dateOfBirth!: Date
    gender!: Number
    beginningOfWork!: Date
    status?: boolean
    roles?: RoleToEmployee[] = []

}
// enum Gender {
//     Male,
//     Female
// }

