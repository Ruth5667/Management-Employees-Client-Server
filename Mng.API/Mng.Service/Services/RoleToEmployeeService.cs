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
    public class RoleToEmployeeService:IRoleToEmployeeService
    {
        private readonly IRoleToEmployeeRepository _repository;

        public RoleToEmployeeService(IRoleToEmployeeRepository repository)
        {
            _repository = repository;

        }

        public IEnumerable<RoleToEmployee> GetAll(int employeeId)
        {
            return _repository.GetAll(employeeId);
        }

        public RoleToEmployee GetRoleByEmployeeId(int employeeId)
        {
            throw new NotImplementedException();
        }

        public RoleToEmployee Post(RoleToEmployee roleToEmployee)
        {
            return _repository.Post(roleToEmployee);
        }


    }
}
