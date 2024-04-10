using Mng.Core.Entities;
using Mng.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public IEnumerable<Role> GetRoles()
        {
            return _context.Role.ToList();
        }

        public Role GetRoleById(int id)
        {
            return _context.Role.Where(r => r.Id == id).First();
        }

        public Role Post(Role role)
        {
            _context.Role.Add(role);
            _context.SaveChanges();
            return role;
        }

        public Role Put(int id, Role role)
        {
            var currentRole = GetRoleById(id);
            if (currentRole == null)
            {
                return null;
            }
            role.Id = currentRole.Id;
            _context.Entry(currentRole).CurrentValues.SetValues(role);
            _context.SaveChanges();
            return currentRole;
        }
        public void Delete(int id)
        {
            var role = GetRoleById(id);
            _context.Role.Remove(role);
            _context.SaveChanges();
        }
    }
}
