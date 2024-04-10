using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Services
{
    public interface IRoleService
    {
        public Task<IEnumerable<Role>> GetRoles();
        public Task<Role> GetRoleById(int id);
        public Task<Role> Post(Role role);
        public Task<Role> Put(int id, Role role);
        public void Delete(int id);
    }
}
