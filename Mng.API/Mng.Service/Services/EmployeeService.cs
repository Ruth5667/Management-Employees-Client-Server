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

        public async Task<Employee> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<IEnumerable<Employee>> Get()
        {
            return await _repository.GetEmployees();
        }
        static bool CheckIDNo(String strID)
        {
            int[] id_12_digits = { 1, 2, 1, 2, 1, 2, 1, 2, 1 };
            int count = 0;

            if (strID == null)
                return false;

            strID = strID.PadLeft(9, '0');

            for (int i = 0; i < 9; i++)
            {
                int num = Int32.Parse(strID.Substring(i, 1)) * id_12_digits[i];

                if (num > 9)
                    num = (num / 10) + (num % 10);

                count += num;
            }

            return (count % 10 == 0);
        }
        public async Task<Employee> Post(Employee employee)
        {
            var existingEmployees = await _repository.GetEmployees();
            if (existingEmployees.Any(e => e.Tz == employee.Tz))
            {
                return null;
            }
            if(CheckIDNo(employee.Tz))
            return await _repository.Post(employee);
            else
            {
                throw new Exception("the tz is not valid!");
            }
        }

        public async Task<Employee> Put(int id, Employee employee)
        {
           return await _repository.Put(id, employee);  
        }

        public void Delete(int id)
        {
            _repository.Delete(id);
        }

        public async Task<Employee> UpdateStatus(int id)
        {
            return await _repository.UpdateStatus(id);
        }
    }
}
