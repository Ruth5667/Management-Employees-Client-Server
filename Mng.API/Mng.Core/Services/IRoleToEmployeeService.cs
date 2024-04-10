using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Services
{
    public interface IRoleToEmployeeService
    {
        public RoleToEmployee Post(RoleToEmployee role);
        public IEnumerable<RoleToEmployee> GetAll(int employeeId);
        //public RoleToEmployee Post(int employeeId, int positionId, PositionEmployee positionEmployee);
        public RoleToEmployee GetRoleByEmployeeId(int employeeId);
    }
}

