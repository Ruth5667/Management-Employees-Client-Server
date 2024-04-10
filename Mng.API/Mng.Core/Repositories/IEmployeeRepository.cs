using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Repositories
{
    public interface IEmployeeRepository
    {
        public IEnumerable<Employee> GetEmployees();
        public Employee GetById(int id);
        public Employee Post(Employee employee);
        public Employee Put(int id, Employee employee);
        public void Delete(int id);
        public Employee UpdateStatus(int id);
    }
}
