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
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _repository;
        public RoleService(IRoleRepository repository)
        {
            _repository = repository;

        }
        public async Task<IEnumerable<Role>> GetRoles()
        {
            return await _repository.GetRoles();
        }
        public async Task<Role> GetRoleById(int id)
        {
            return await _repository.GetRoleById(id);
        }
        public void Delete(int id)
        {
             _repository.Delete(id);
        }
        public async Task<Role> Post(Role role)
        {
            return await _repository.Post(role);
        }

        public async Task<Role> Put(int id, Role role)
        {
            return await _repository.Put(id,role);
        }
    }
}
