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
        public Task<IEnumerable<Employee>> Get();
        public Task<Employee> GetById(int id);
        public Task<Employee> Post(Employee employee);
        public Task<Employee> Put(int id, Employee employee);
        public void Delete(int id);
        public Task<Employee> UpdateStatus(int id);
    }
}
