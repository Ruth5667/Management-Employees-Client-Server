using AutoMapper;
using Mng.Core.Entities;
using Mng.Core.Repositories;
using Mng.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Service.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repository;
        //private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepository repository/*, IMapper mapper*/)
        {
            _repository = repository;
            //_mapper = mapper;

        }

        public Employee GetById(int id)
        {
            return _repository.GetById(id);
        }

        public IEnumerable<Employee> Get()
        {
            return _repository.GetEmployees();
        }

        public Employee Post(Employee employee)
        {
            var existingEmployees =  _repository.GetEmployees();
            if (existingEmployees.Any(e => e.Id == employee.Id))
            {
                return null;
            }
            return _repository.Post(employee);
        }

        public Employee Put(int id, Employee employee)
        {
           return _repository.Put(id, employee);  
        }

        public void Delete(int id)
        {
            _repository.Delete(id);
        }

        public Employee UpdateStatus(int id)
        {
            return _repository.UpdateStatus(id);
        }
    }
}
