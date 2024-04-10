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
    public class RoleToEmployeeRepository : IRoleToEmployeeRepository
    {
        private readonly DataContext _context;
        public RoleToEmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public IEnumerable<RoleToEmployee> GetAll(int employeeId)
        {
            throw new NotImplementedException();
        }

        public RoleToEmployee GetRoleByEmployeeId(int employeeId)
        {
            throw new NotImplementedException();
        }

        public RoleToEmployee Post(RoleToEmployee role)
        {
            _context.RoleToEmployee.Add(role);
            _context.SaveChanges();
            return role;
        }
    }
}
