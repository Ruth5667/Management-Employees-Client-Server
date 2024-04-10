using Microsoft.EntityFrameworkCore;
using Mng.Core.Entities;
using Mng.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        //public static int EmployeeIdCounter = 0;
       
        public IEnumerable<Employee> GetEmployees() { return _context.Employee.Where(e => e.Status == true).Include(e=>e.Roles).ToList(); }
        public Employee Post(Employee employee)
        {
           employee.Status = true;
            _context.Entry(employee).Collection(e=> e.Roles).Load();
            _context.Employee.Add(employee);
            _context.SaveChanges();
            return employee;
        }

        public Employee Put(int id, Employee employee)
        {
            var currentEmployee = GetById(id);  
            if (currentEmployee == null)
            {
                return null;
            }
            employee.Id = currentEmployee.Id;
            employee.Status=currentEmployee.Status;
            currentEmployee.Roles= employee.Roles;
            _context.Entry(currentEmployee).CurrentValues.SetValues(employee);
            
            _context.SaveChanges();
            return currentEmployee;
        }
    
   
        public Employee UpdateStatus(int id)
        {
            var currentEmployee = GetById(id);
            currentEmployee.Status = !currentEmployee.Status;
            _context.SaveChanges();
            return currentEmployee;
        }

        public void Delete(int id)
        {
            var employee = GetById(id);
           _context.Employee.Remove(employee);
        }

        public Employee GetById(int id)
        {
            return _context.Employee.Include(e => e.Roles).First(e => e.Id == id);
        }
    }
}
