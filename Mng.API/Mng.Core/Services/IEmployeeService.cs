using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Services
{
    public interface IEmployeeService
    {
        public IEnumerable<Employee> Get();
        public Employee GetById(int id);
        public Employee Post(Employee employee);
        public Employee Put(int id, Employee employee);
        public void Delete(int id);
        public Employee UpdateStatus(int id);
    }
}
/*
 מחלקת עובד:
*Put(bool status);
 מחלקת תפקיד:
 * GetAll();
 * GetByName();????
  מחלקת תפקיד לעובד:
 * Post(Role,Employee);
 * Put(RoleId,EmployeeId)
 * Delete(RoleId,EmployeeId)
 * 
*/