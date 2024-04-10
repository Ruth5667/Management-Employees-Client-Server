using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Repositories
{
    public interface IRoleToEmployeeRepository
    {
        public Task<IEnumerable<RoleToEmployee> >GetAll(int employeeId);
        public Task<RoleToEmployee> GetRoleByEmployeeId(int employeeId);
        public  Task<RoleToEmployee> Post(RoleToEmployee role);
    }
}
