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
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Role>> GetRoles()
        {
            return await _context.Role.ToListAsync();
        }

        public async Task<Role> GetRoleById(int id)
        {
            return await _context.Role.Where(r => r.Id == id).FirstAsync();
        }

        public async Task<Role> Post(Role role)
        {
            _context.Role.Add(role);
            await _context.SaveChangesAsync();
            return role;
        }

        public async Task<Role> Put(int id, Role role)
        {
            var currentRole = await GetRoleById(id);
            if (currentRole == null)
            {
                return null;
            }
            role.Id = currentRole.Id;
            _context.Entry(currentRole).CurrentValues.SetValues(role);
            await _context.SaveChangesAsync();
            return currentRole;
        }
        public async void Delete(int id)
        {
            var role = await GetRoleById(id);
            _context.Role.Remove(role);
            _context.SaveChanges();
        }
    }
}
