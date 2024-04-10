using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Repositories
{
    public interface IRoleRepository
    {
        public IEnumerable<Role> GetRoles();
        public Role GetRoleById(int id);
        public Role Post(Role role);
        public Role Put(int id,Role role);
        public void Delete(int id);
    }
}
